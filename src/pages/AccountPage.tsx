
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

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
    
    // В реальном приложении тут был бы редирект на страницу ЮMoney
    toast({
      title: "Переход к оплате",
      description: "Вы будете перенаправлены на страницу оплаты ЮMoney",
    });
    
    // Имитация перехода на страницу оплаты
    setTimeout(() => {
      toast({
        title: "Пополнение успешно",
        description: `Счет пополнен на ${amount}₽`,
      });
      setDepositAmount("");
    }, 2000);
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
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-950 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Личный кабинет</h1>
          <Link to="/">
            <Button variant="outline" className="border-purple-400 text-white hover:bg-purple-800">На главную</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-white/10 backdrop-blur-md border-purple-400/20">
            <CardHeader>
              <CardTitle className="text-white">Основной баланс</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{mockUserData.mainBalance.toFixed(2)}₽</p>
              <p className="text-sm text-purple-200">Доступно для игры и вывода</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-purple-400/20">
            <CardHeader>
              <CardTitle className="text-white">Бонусный баланс</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{mockUserData.bonusBalance.toFixed(2)}₽</p>
              <p className="text-sm text-purple-200">Нужно отыграть x20 для вывода</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs text-purple-200">
                  <span>Отыграно:</span>
                  <span>{mockUserData.wagerCompleted.toFixed(2)}₽ / {mockUserData.bonusWager.toFixed(2)}₽</span>
                </div>
                <div className="w-full h-2 bg-purple-950 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-purple-400 to-indigo-500"
                    style={{ width: `${wagerProgress}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-purple-400/20">
            <CardHeader>
              <CardTitle className="text-white">Промокод</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input
                placeholder="Введите промокод"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="bg-white/20 border-purple-400/30 text-white placeholder:text-purple-200/50"
              />
              <Button 
                onClick={applyPromoCode} 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                Активировать
              </Button>
              <p className="text-xs text-purple-200 text-center">Новым игрокам: FREE150</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="w-full bg-white/10 text-purple-200 mb-4">
            <TabsTrigger value="deposit" className="flex-1 data-[state=active]:bg-purple-700">Пополнение</TabsTrigger>
            <TabsTrigger value="withdraw" className="flex-1 data-[state=active]:bg-purple-700">Вывод</TabsTrigger>
            <TabsTrigger value="history" className="flex-1 data-[state=active]:bg-purple-700">История</TabsTrigger>
          </TabsList>
          
          <TabsContent value="deposit">
            <Card className="bg-white/10 backdrop-blur-md border-purple-400/20">
              <CardHeader>
                <CardTitle className="text-white">Пополнение баланса</CardTitle>
                <CardDescription className="text-purple-200">
                  Минимальная сумма пополнения — 100₽
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDeposit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-white">Сумма пополнения</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Введите сумму"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      min="100"
                      className="bg-white/20 border-purple-400/30 text-white placeholder:text-purple-200/50"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    Пополнить через ЮMoney
                  </Button>
                  <p className="text-sm text-purple-200 text-center">
                    Пополнение от 100₽ участвует в розыгрыше денежных призов!
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="withdraw">
            <Card className="bg-white/10 backdrop-blur-md border-purple-400/20">
              <CardHeader>
                <CardTitle className="text-white">Вывод средств</CardTitle>
                <CardDescription className="text-purple-200">
                  Минимальная сумма вывода — 500₽
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWithdraw} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdraw-amount" className="text-white">Сумма вывода</Label>
                    <Input
                      id="withdraw-amount"
                      type="number"
                      placeholder="Введите сумму"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      min="500"
                      max={mockUserData.mainBalance.toString()}
                      className="bg-white/20 border-purple-400/30 text-white placeholder:text-purple-200/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-method" className="text-white">Способ вывода</Label>
                    <select
                      id="payment-method"
                      className="w-full p-2 rounded-md bg-white/20 border border-purple-400/30 text-white"
                    >
                      <option value="card">Банковская карта</option>
                      <option value="yoomoney">ЮMoney</option>
                      <option value="qiwi">QIWI</option>
                      <option value="crypto">Криптовалюта</option>
                    </select>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    Создать заявку на вывод
                  </Button>
                  <p className="text-xs text-purple-200 text-center">
                    Вывод средств обрабатывается в течение 24 часов
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card className="bg-white/10 backdrop-blur-md border-purple-400/20">
              <CardHeader>
                <CardTitle className="text-white">История операций</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-purple-400/30">
                        <th className="p-2 text-purple-200">Дата</th>
                        <th className="p-2 text-purple-200">Тип</th>
                        <th className="p-2 text-purple-200">Сумма</th>
                        <th className="p-2 text-purple-200">Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUserData.transactions.map((tx, index) => (
                        <tr key={index} className="border-b border-purple-400/20">
                          <td className="p-2 text-white">{tx.date}</td>
                          <td className="p-2 text-white">{tx.type}</td>
                          <td className="p-2 text-white">
                            <span className={tx.amount > 0 ? "text-green-400" : "text-red-400"}>
                              {tx.amount > 0 ? "+" : ""}{tx.amount}₽
                            </span>
                          </td>
                          <td className="p-2 text-white">{tx.status}</td>
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
