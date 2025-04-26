
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import WinTape from "@/components/WinTape";
import OnlineCounter from "@/components/OnlineCounter";
import { useToast } from "@/components/ui/use-toast";
import { 
  Users, 
  Wallet, 
  Sparkles, 
  Dice5, 
  CreditCard, 
  Gift,
  ChevronRight
} from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
    
    // Показываем уведомление о промокоде для новых пользователей
    if (!localStorage.getItem("promoShown")) {
      toast({
        title: "Бонус для новых игроков!",
        description: "Используйте промокод FREE150 и получите 150₽ на основной баланс",
        duration: 10000,
      });
      localStorage.setItem("promoShown", "true");
    }
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen bg-dice-dark text-white">
      {/* Навигационная панель */}
      <header className="bg-dice-darker py-4 shadow-lg border-b border-dice-primary/20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-dice-primary flex items-center gap-2">
            <Dice5 className="w-6 h-6" />
            RuletDice
          </Link>
          <div className="flex items-center gap-4">
            <OnlineCounter />
            {isLoggedIn ? (
              <>
                <Link to="/account">
                  <Button variant="ghost" className="text-white hover:text-dice-primary">
                    Личный кабинет
                  </Button>
                </Link>
                <Link to="/game">
                  <Button className="bg-dice-primary hover:bg-dice-secondary text-white">
                    Играть
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-dice-primary"
                  onClick={() => setShowLoginModal(true)}
                >
                  Войти
                </Button>
                <Link to="/register">
                  <Button className="bg-dice-primary hover:bg-dice-secondary text-white">
                    Регистрация
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Основное содержимое */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Главный баннер */}
        <div className="bg-gradient-to-r from-dice-dark to-dice-light rounded-xl p-8 mb-8 shadow-lg border border-dice-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-dice-primary/10 rounded-full -mt-40 -mr-40 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-600/10 rounded-full -mb-30 -ml-30 blur-3xl"></div>
          
          <div className="max-w-2xl relative z-10">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-dice-primary bg-clip-text text-transparent">
              Добро пожаловать в RuletDice!
            </h1>
            <p className="text-gray-300 mb-6 text-lg">
              Испытайте свою удачу в нашей игре Dice. Получите бонус 1500₽ при регистрации 
              с множителем x20 и выводите выигрыш на любые карты или в криптовалюте.
            </p>
            <div className="space-y-4">
              <Link to="/game">
                <Button className="bg-dice-primary hover:bg-dice-secondary text-white px-6 py-6 rounded-lg flex items-center gap-2 shadow-lg shadow-dice-primary/20">
                  <Dice5 className="w-5 h-5" />
                  <span className="font-bold">Начать игру</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
              <div className="bg-white/5 p-4 rounded-lg border border-dice-primary/30 mt-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-yellow-300 font-medium mb-1">
                  <Gift className="w-4 h-4" />
                  <p>ПРОМОКОД: FREE150</p>
                </div>
                <p className="text-sm text-gray-400">Активируйте и получите 150₽ на основной баланс</p>
              </div>
            </div>
          </div>
        </div>

        {/* Лента выигрышей */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Последние выигрыши</h2>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-400 text-sm">Обновляется в реальном времени</span>
            </div>
          </div>
          <WinTape />
        </div>

        {/* Преимущества */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 p-6 rounded-lg shadow-lg border border-dice-primary/20 hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 bg-dice-primary/20 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-dice-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Мгновенные выплаты</h3>
            <p className="text-gray-300">Вывод средств от 500₽ на любые карты и криптовалюты</p>
          </div>
          <div className="bg-white/5 p-6 rounded-lg shadow-lg border border-dice-primary/20 hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 bg-dice-primary/20 rounded-full flex items-center justify-center mb-4">
              <Gift className="w-6 h-6 text-dice-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Бонусы и промокоды</h3>
            <p className="text-gray-300">Бонус 1500₽ для новых игроков с вейджером x20</p>
          </div>
          <div className="bg-white/5 p-6 rounded-lg shadow-lg border border-dice-primary/20 hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 bg-dice-primary/20 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-dice-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Розыгрыши призов</h3>
            <p className="text-gray-300">Ежедневные розыгрыши за пополнение от 100₽</p>
          </div>
        </div>

        {/* Информация о пополнении */}
        <div className="bg-white/5 rounded-lg p-6 mb-8 border border-dice-primary/20 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-dice-primary" />
            Пополнение и вывод средств
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-xl font-bold mb-2">Пополнение</h3>
              <ul className="space-y-2">
                {[
                  "Минимальная сумма пополнения: 100₽",
                  "Поддержка ЮMoney и банковских карт",
                  "Мгновенное зачисление средств"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <div className="w-1.5 h-1.5 bg-dice-primary rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-xl font-bold mb-2">Вывод</h3>
              <ul className="space-y-2">
                {[
                  "Минимальная сумма вывода: 500₽",
                  "Вывод на банковские карты",
                  "Поддержка популярных криптовалют"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <div className="w-1.5 h-1.5 bg-dice-primary rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Футер */}
      <footer className="bg-dice-darker py-6 border-t border-dice-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center gap-3">
              <p className="text-gray-400">© 2025 RuletDice. Все права защищены.</p>
              <OnlineCounter />
            </div>
            <div className="flex gap-4">
              <Link to="/terms" className="text-gray-400 hover:text-dice-primary">
                Пользовательское соглашение
              </Link>
              <Link to="/support" className="text-gray-400 hover:text-dice-primary">
                Поддержка
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
