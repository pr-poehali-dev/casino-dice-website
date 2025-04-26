
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoAmount, setPromoAmount] = useState("");
  const [promoLimit, setPromoLimit] = useState("");
  const { toast } = useToast();

  // Имитация проверки прав администратора при загрузке страницы
  useEffect(() => {
    // В реальном приложении здесь была бы проверка авторизации через API
    const checkAdmin = () => {
      // Имитируем проверку администратора
      // В реальном приложении здесь был бы запрос к серверу
      setTimeout(() => {
        const isAdminUser = true; // В реальности получали бы из сессии/токенов
        setIsAdmin(isAdminUser);
        
        if (!isAdminUser) {
          toast({
            variant: "destructive",
            title: "Доступ запрещен",
            description: "У вас нет прав администратора",
          });
          window.location.href = "/";
        }
      }, 500);
    };
    
    checkAdmin();
  }, [toast]);

  // Данные для статистики (в реальности получали бы с сервера)
  const stats = {
    totalUsers: 1245,
    activeUsers: 387,
    totalDeposits: 9875000,
    totalWithdrawals: 6543000,
    profit: 3332000,
    newUsersToday: 43,
    depositsToday: 356000,
    withdrawalsToday: 245000,
  };

  // Список существующих промокодов
  const [promos, setPromos] = useState([
    { code: "FREE150", amount: 150, used: 328, limit: 1000, active: true },
    { code: "WELCOME500", amount: 500, used: 124, limit: 200, active: true },
    { code: "VIPBONUS", amount: 1000, used: 56, limit: 100, active: true },
    { code: "SUMMER2025", amount: 300, used: 200, limit: 200, active: false },
  ]);

  // Создание нового промокода
  const createPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!promoCode || !promoAmount || !promoLimit) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Заполните все поля для создания промокода",
      });
      return;
    }
    
    const newPromo = {
      code: promoCode,
      amount: parseInt(promoAmount),
      used: 0,
      limit: parseInt(promoLimit),
      active: true,
    };
    
    setPromos([...promos, newPromo]);
    
    toast({
      title: "Промокод создан",
      description: `Промокод ${promoCode} успешно создан`,
    });
    
    setPromoCode("");
    setPromoAmount("");
    setPromoLimit("");
  };

  // Переключение активности промокода
  const togglePromoStatus = (index: number) => {
    const updatedPromos = [...promos];
    updatedPromos[index].active = !updatedPromos[index].active;
    setPromos(updatedPromos);
    
    toast({
      title: "Статус промокода изменен",
      description: `Промокод ${promos[index].code} ${updatedPromos[index].active ? "активирован" : "деактивирован"}`,
    });
  };

  // Список последних пользователей
  const recentUsers = [
    { id: 1, username: "Player123", registeredDate: "2025-04-26", balance: 2500, bonusBalance: 1500 },
    { id: 2, username: "GameMaster", registeredDate: "2025-04-25", balance: 5600, bonusBalance: 0 },
    { id: 3, username: "LuckyOne", registeredDate: "2025-04-25", balance: 3200, bonusBalance: 1500 },
    { id: 4, username: "Dice_Pro", registeredDate: "2025-04-24", balance: 8750, bonusBalance: 0 },
    { id: 5, username: "GamblerKing", registeredDate: "2025-04-24", balance: 1200, bonusBalance: 1500 },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-950 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-md border-purple-400/20 max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-white text-center">Проверка прав администратора...</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-8 h-8 border-t-2 border-purple-500 rounded-full animate-spin"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-950 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Панель администратора</h1>
          <Link to="/">
            <Button variant="outline" className="border-purple-400 text-white hover:bg-purple-800">На главную</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/10 backdrop-blur-md border-purple-400/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm">Пользователей</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
              <p className="text-xs text-purple-200">+{stats.newUsersToday} сегодня</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-purple-400/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm">Всего депозитов</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">{(stats.totalDeposits / 1000).toFixed(0)}K ₽</p>
              <p className="text-xs text-purple-200">+{(stats.depositsToday / 1000).toFixed(0)}K ₽ сегодня</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-purple-400/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm">Всего выводов</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">{(stats.totalWithdrawals / 1000).toFixed(0)}K ₽</p>
              <p className="text-xs text-purple-200">+{(stats.withdrawalsToday / 1000).toFixed(0)}K ₽ сегодня</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-purple-400/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm">Прибыль</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">{(stats.profit / 1000).toFixed(0)}K ₽</p>
              <p className="text-xs text-purple-200">{((stats.profit / stats.totalDeposits) * 100).toFixed(1)}% от депозитов</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="promos" className="w-full">
          <TabsList className="w-full bg-white/10 text-purple-200 mb-4">
            <TabsTrigger value="promos" className="flex-1 data-[state=active]:bg-purple-700">Промокоды</TabsTrigger>
            <TabsTrigger value="users" className="flex-1 data-[state=active]:bg-purple-700">Пользователи</TabsTrigger>
            <TabsTrigger value="settings" className="flex-1 data-[state=active]:bg-purple-700">Настройки сайта</TabsTrigger>
          </TabsList>
          
          <TabsContent value="promos">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="bg-white/10 backdrop-blur-md border-purple-400/20">
                  <CardHeader>
                    <CardTitle className="text-white">Активные промокоды</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-purple-400/30">
                            <th className="p-2 text-purple-200">Промокод</th>
                            <th className="p-2 text-purple-200">Сумма</th>
                            <th className="p-2 text-purple-200">Использовано</th>
                            <th className="p-2 text-purple-200">Лимит</th>
                            <th className="p-2 text-purple-200">Статус</th>
                            <th className="p-2 text-purple-200">Действия</th>
                          </tr>
                        </thead>
                        <tbody>
                          {promos.map((promo, index) => (
                            <tr key={index} className="border-b border-purple-400/20">
                              <td className="p-2 text-white">{promo.code}</td>
                              <td className="p-2 text-white">{promo.amount}₽</td>
                              <td className="p-2 text-white">{promo.used}</td>
                              <td className="p-2 text-white">{promo.limit}</td>
                              <td className="p-2 text-white">
                                <span className={`px-2 py-1 rounded-full text-xs ${promo.active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                  {promo.active ? "Активен" : "Неактивен"}
                                </span>
                              </td>
                              <td className="p-2 text-white">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => togglePromoStatus(index)}
                                  className="border-purple-400/30 text-white hover:bg-purple-800"
                                >
                                  {promo.active ? "Деактивировать" : "Активировать"}
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="bg-white/10 backdrop-blur-md border-purple-400/20">
                  <CardHeader>
                    <CardTitle className="text-white">Создать промокод</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={createPromoCode} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="promo-code" className="text-white">Код промокода</Label>
                        <Input
                          id="promo-code"
                          placeholder="Например: WELCOME500"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="bg-white/20 border-purple-400/30 text-white placeholder:text-purple-200/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="promo-amount" className="text-white">Сумма бонуса (₽)</Label>
                        <Input
                          id="promo-amount"
                          type="number"
                          placeholder="Например: 500"
                          value={promoAmount}
                          onChange={(e) => setPromoAmount(e.target.value)}
                          className="bg-white/20 border-purple-400/30 text-white placeholder:text-purple-200/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="promo-limit" className="text-white">Лимит использований</Label>
                        <Input
                          id="promo-limit"
                          type="number"
                          placeholder="Например: 100"
                          value={promoLimit}
                          onChange={(e) => setPromoLimit(e.target.value)}
                          className="bg-white/20 border-purple-400/30 text-white placeholder:text-purple-200/50"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                      >
                        Создать промокод
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <Card className="bg-white/10 backdrop-blur-md border-purple-400/20">
              <CardHeader>
                <CardTitle className="text-white">Последние пользователи</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-purple-400/30">
                        <th className="p-2 text-purple-200">ID</th>
                        <th className="p-2 text-purple-200">Имя пользователя</th>
                        <th className="p-2 text-purple-200">Дата регистрации</th>
                        <th className="p-2 text-purple-200">Основной баланс</th>
                        <th className="p-2 text-purple-200">Бонусный баланс</th>
                        <th className="p-2 text-purple-200">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b border-purple-400/20">
                          <td className="p-2 text-white">{user.id}</td>
                          <td className="p-2 text-white">{user.username}</td>
                          <td className="p-2 text-white">{user.registeredDate}</td>
                          <td className="p-2 text-white">{user.balance}₽</td>
                          <td className="p-2 text-white">{user.bonusBalance}₽</td>
                          <td className="p-2 text-white">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-purple-400/30 text-white hover:bg-purple-800 mr-2"
                            >
                              Редактировать
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-red-400/30 text-red-300 hover:bg-red-900/30"
                            >
                              Блокировать
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-purple-400/20">
                <CardHeader>
                  <CardTitle className="text-white">Общие настройки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name" className="text-white">Название сайта</Label>
                    <Input
                      id="site-name"
                      defaultValue="Dice Casino"
                      className="bg-white/20 border-purple-400/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-deposit" className="text-white">Минимальный депозит (₽)</Label>
                    <Input
                      id="min-deposit"
                      type="number"
                      defaultValue="100"
                      className="bg-white/20 border-purple-400/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-withdraw" className="text-white">Минимальный вывод (₽)</Label>
                    <Input
                      id="min-withdraw"
                      type="number"
                      defaultValue="500"
                      className="bg-white/20 border-purple-400/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wager-multiplier" className="text-white">Вейджер (множитель)</Label>
                    <Input
                      id="wager-multiplier"
                      type="number"
                      defaultValue="20"
                      className="bg-white/20 border-purple-400/30 text-white"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                    Сохранить настройки
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border-purple-400/20">
                <CardHeader>
                  <CardTitle className="text-white">Настройки игры Dice</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-bet" className="text-white">Минимальная ставка (₽)</Label>
                    <Input
                      id="min-bet"
                      type="number"
                      defaultValue="10"
                      className="bg-white/20 border-purple-400/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-bet" className="text-white">Максимальная ставка (₽)</Label>
                    <Input
                      id="max-bet"
                      type="number"
                      defaultValue="10000"
                      className="bg-white/20 border-purple-400/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="house-edge" className="text-white">Преимущество казино (%)</Label>
                    <Input
                      id="house-edge"
                      type="number"
                      defaultValue="1"
                      step="0.1"
                      min="0.1"
                      max="5"
                      className="bg-white/20 border-purple-400/30 text-white"
                    />
                    <p className="text-xs text-purple-200">
                      Влияет на шансы игрока на выигрыш. Рекомендуемое значение: 1-2%.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-profit" className="text-white">Максимальный выигрыш (₽)</Label>
                    <Input
                      id="max-profit"
                      type="number"
                      defaultValue="100000"
                      className="bg-white/20 border-purple-400/30 text-white"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                    Сохранить настройки игры
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
