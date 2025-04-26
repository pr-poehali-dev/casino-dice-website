
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, CreditCard, Wallet, History, Gift, ArrowRight } from "lucide-react";

const AccountPage = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const { toast } = useToast();

  // В реальном приложении данные пользователя были бы получены из API
  const mockUserData = {
    username: "ИгрокДайс",
    mainBalance: 2500.0,
    bonusBalance: 1500.0,
    bonusWager: 30000.0, // х20 от бонуса 1500
    wagerCompleted: 5400.0,
    transactions: [
      { date: "2025-04-25", type: "Депозит", amount: 1000, status: "Успешно" },
      { date: "2025-04-24", type: "Бонус", amount: 1500, status: "Начислен" },
      { date: "2025-04-23", type: "Выигрыш", amount: 750, status: "Начислен" },
      { date: "2025-04-22", type: "Ставка", amount: -250, status: "Проигрыш" },
    ],
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    
    if (isNaN(amount) || amount < 100) {
      toast({
        variant: "destructive",
        title: "Ошибка пополнения",
        description: "Минимальная сумма пополнения — 100₽",
      });
      return;
    }
    
    // Формируем URL для перехода на страницу ЮMoney
    const yoomoneyUrl = `https://yoomoney.ru/quickpay/confirm.xml?receiver=4100116342286505&quickpay-form=shop&targets=Пополнение+баланса&paymentType=AC&sum=${amount}&label=${mockUserData.username}&successURL=${encodeURIComponent(window.location.href)}`;
    
    // Открываем страницу в новом окне
    window.open(yoomoneyUrl, "_blank");
    
    toast({
      title: "Переход к оплате",
      description: "Следуйте инструкциям на странице ЮMoney для пополнения",
    });
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    
    if (isNaN(amount) || amount < 500) {
      toast({
        variant: "destructive",
        title: "Ошибка вывода",
        description: "Минимальная сумма вывода — 500₽",
      });
      return;
    }
    
    if (amount > mockUserData.mainBalance) {
      toast({
        variant: "destructive",
        title: "Недостаточно средств",
        description: "На вашем счете недостаточно средств для вывода",
      });
      return;
    }
    
    toast({
      title: "Заявка на вывод создана",
      description: `Вывод ${amount}₽ будет обработан в течение 24 часов`,
    });
    setWithdrawAmount("");
  };

  const applyPromoCode = () => {
    if (promoCode === "FREE150") {
      toast({
        title: "Промокод активирован",
        description: "На ваш счет зачислено 150₽",
      });
      setPromoCode("");
    } else {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Недействительный промокод или вы уже использовали этот промокод",
      });
    }
  };

  // Расчет прогресса отыгрыша вейджера
  const wagerProgress = Math.min(100, (mockUserData.wagerCompleted / mockUserData.bonusWager) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dice-dark to-dice-darker p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">Личный кабинет</h1>
            <div className="bg-dice-primary/20 px-3 py-1 rounded-full text-sm text-dice-primary">
              {mockUserData.username}
            </div>
          </div>
          <Link to="/">
            <Button variant="outline" className="border-dice-primary/40 text-white hover:bg-dice-primary/20">На главную</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-white/5 backdrop-blur-md border-dice-primary/20 overflow-hidden">
            <div className="absolute right-0 top-0 w-20 h-20 -mt-5 -mr-5 bg-dice-primary/10 rounded-full"></div>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-dice-primary" />
                Основной баланс
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{mockUserData.mainBalance.toFixed(2)}₽</p>
              <p className="text-sm text-dice-primary/70">Доступно для игры и вывода</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-md border-dice-primary/20 overflow-hidden">
            <div className="absolute right-0 top-0 w-20 h-20 -mt-5 -mr-5 bg-dice-primary/10 rounded-full"></div>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gift className="w-5 h-5 text-dice-primary" />
                Бонусный баланс
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{mockUserData.bonusBalance.toFixed(2)}₽</p>
              <p className="text-sm text-dice-primary/70">Нужно отыграть x20 для вывода</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs text-dice-primary/70">
                  <span>Отыграно:</span>
                  <span>{mockUserData.wagerCompleted.toFixed(2)}₽ / {mockUserData.bonusWager.toFixed(2)}₽</span>
                </div>
                <div className="w-full h-2 bg-dice-darker rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-dice-primary to-purple-500"
                    style={{ width: `${wagerProgress}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-md border-dice-primary/20 overflow-hidden">
            <div className="absolute right-0 top-0 w-20 h-20 -mt-5 -mr-5 bg-dice-primary/10 rounded-full"></div>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gift className="w-5 h-5 text-dice-primary" />
                Промокод
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="relative">
                <Input
                  placeholder="Введите промокод"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="bg-white/10 border-dice-primary/30 text-white placeholder:text-white/30"
                />
                <Button 
                  onClick={applyPromoCode} 
                  className="absolute right-0 top-0 h-full bg-dice-primary hover:bg-dice-secondary rounded-l-none"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-dice-primary/70 text-center">Новым игрокам: FREE150</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="w-full bg-white/5 text-white/70 mb-4 p-1">
            <TabsTrigger value="deposit" className="flex-1 data-[state=active]:bg-dice-primary">Пополнение</TabsTrigger>
            <TabsTrigger value="withdraw" className="flex-1 data-[state=active]:bg-dice-primary">Вывод</TabsTrigger>
            <TabsTrigger value="history" className="flex-1 data-[state=active]:bg-dice-primary">История</TabsTrigger>
          </TabsList>
          
          <TabsContent value="deposit">
            <Card className="bg-white/5 backdrop-blur-md border-dice-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-dice-primary" />
                  Пополнение баланса
                </CardTitle>
                <CardDescription className="text-dice-primary/70">
                  Минимальная сумма пополнения — 100₽
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDeposit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-white">Сумма пополнения</Label>
                    <div className="relative">
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Введите сумму"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        min="100"
                        className="bg-white/10 border-dice-primary/30 text-white placeholder:text-white/30 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50">₽</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-dice-primary/20 rounded-lg p-3 flex items-center gap-2 cursor-pointer hover:bg-dice-primary/10 transition-colors">
                      <div className="w-5 h-5 rounded-full border-2 border-dice-primary/50 flex items-center justify-center">
                        <div className="w-2 h-2 bg-dice-primary rounded-full"></div>
                      </div>
                      <span className="text-white">Банковская карта</span>
                    </div>
                    <div className="border border-dice-primary/20 rounded-lg p-3 flex items-center gap-2 cursor-pointer hover:bg-dice-primary/10 transition-colors">
                      <div className="w-5 h-5 rounded-full border-2 border-dice-primary/50 flex items-center justify-center">
                        <div className="w-2 h-2 bg-dice-primary rounded-full"></div>
                      </div>
                      <span className="text-white">ЮMoney</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {[100, 500, 1000, 2500].map((amount) => (
                      <Button 
                        key={amount}
                        type="button" 
                        onClick={() => setDepositAmount(amount.toString())}
                        variant="outline"
                        className="border-dice-primary/30 text-white hover:bg-dice-primary/20"
                      >
                        {amount}₽
                      </Button>
                    ))}
                  </div>
                  
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-200">
                      Пополнение от 100₽ участвует в ежедневном розыгрыше призов!
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-dice-primary hover:bg-dice-secondary text-white h-12 rounded-lg"
                  >
                    Пополнить через ЮMoney
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="withdraw">
            <Card className="bg-white/5 backdrop-blur-md border-dice-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-dice-primary" />
                  Вывод средств
                </CardTitle>
                <CardDescription className="text-dice-primary/70">
                  Минимальная сумма вывода — 500₽
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWithdraw} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdraw-amount" className="text-white">Сумма вывода</Label>
                    <div className="relative">
                      <Input
                        id="withdraw-amount"
                        type="number"
                        placeholder="Введите сумму"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        min="500"
                        max={mockUserData.mainBalance.toString()}
                        className="bg-white/10 border-dice-primary/30 text-white placeholder:text-white/30 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50">₽</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="payment-method" className="text-white">Способ вывода</Label>
                    <select
                      id="payment-method"
                      className="w-full p-2 rounded-lg bg-white/10 border border-dice-primary/30 text-white"
                    >
                      <option value="card">Банковская карта</option>
                      <option value="yoomoney">ЮMoney</option>
                      <option value="qiwi">QIWI</option>
                      <option value="crypto">Криптовалюта</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2 bg-white/5 p-4 rounded-lg">
                    <Label htmlFor="crypto-address" className="text-white flex justify-between">
                      <span>Адрес кошелька / Номер карты</span>
                      <span className="text-dice-primary text-xs">Обязательно</span>
                    </Label>
                    <Input
                      id="crypto-address"
                      placeholder="Введите реквизиты для вывода средств"
                      className="bg-white/10 border-dice-primary/30 text-white placeholder:text-white/30"
                    />
                  </div>
                  
                  <div className="bg-dice-primary/10 border border-dice-primary/30 rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-dice-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-white/70">
                      Вывод средств обрабатывается в течение 24 часов. Убедитесь, что вы указали корректные реквизиты.
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-dice-primary hover:bg-dice-secondary text-white h-12 rounded-lg"
                  >
                    Создать заявку на вывод
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card className="bg-white/5 backdrop-blur-md border-dice-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-dice-primary" />
                  История операций
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-dice-primary/30">
                        <th className="p-3 text-dice-primary/70">Дата</th>
                        <th className="p-3 text-dice-primary/70">Тип</th>
                        <th className="p-3 text-dice-primary/70">Сумма</th>
                        <th className="p-3 text-dice-primary/70">Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUserData.transactions.map((tx, index) => (
                        <tr key={index} className="border-b border-dice-primary/20 hover:bg-white/5 transition-colors">
                          <td className="p-3 text-white">{tx.date}</td>
                          <td className="p-3 text-white">{tx.type}</td>
                          <td className="p-3">
                            <span className={tx.amount > 0 ? "text-green-400" : "text-red-400"}>
                              {tx.amount > 0 ? "+" : ""}{tx.amount}₽
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              tx.status === "Успешно" || tx.status === "Начислен" 
                                ? "bg-green-500/20 text-green-400" 
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}>
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountPage;
