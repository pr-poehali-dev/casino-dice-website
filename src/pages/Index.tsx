
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import WinTape from "@/components/WinTape";
import { useToast } from "@/components/ui/use-toast";

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
    <div className="flex flex-col min-h-screen bg-[#1A1F2C] text-white">
      {/* Навигационная панель */}
      <header className="bg-[#121620] py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-[#9b87f5]">
            RuletDice
          </Link>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link to="/account">
                  <Button variant="ghost" className="text-white hover:text-[#9b87f5]">
                    Личный кабинет
                  </Button>
                </Link>
                <Link to="/game">
                  <Button className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
                    Играть
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-[#9b87f5]"
                  onClick={() => setShowLoginModal(true)}
                >
                  Войти
                </Button>
                <Link to="/register">
                  <Button className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
                    Регистрация
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Основное содержимое */}
      <main className="flex-grow container mx-auto py-8">
        {/* Главный баннер */}
        <div className="bg-gradient-to-r from-[#1A1F2C] to-[#252a39] rounded-xl p-8 mb-8 shadow-lg">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Добро пожаловать в RuletDice!</h1>
            <p className="text-gray-300 mb-6 text-lg">
              Испытайте свою удачу в нашей игре Dice. Получите бонус 1500₽ при регистрации 
              с множителем x20 и выводите выигрыш на любые карты или в криптовалюте.
            </p>
            <div className="space-y-4">
              <Button className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white w-full md:w-auto">
                Начать игру
              </Button>
              <div className="bg-[#252a39] p-4 rounded-lg border border-[#3a4056] mt-4">
                <p className="text-[#ffd700] font-medium">ПРОМОКОД: FREE150</p>
                <p className="text-sm text-gray-400">Активируйте и получите 150₽ на основной баланс</p>
              </div>
            </div>
          </div>
        </div>

        {/* Лента выигрышей */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Последние выигрыши</h2>
          <WinTape />
        </div>

        {/* Преимущества */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#252a39] p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Мгновенные выплаты</h3>
            <p className="text-gray-300">Вывод средств от 500₽ на любые карты и криптовалюты</p>
          </div>
          <div className="bg-[#252a39] p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Бонусы и промокоды</h3>
            <p className="text-gray-300">Бонус 1500₽ для новых игроков с вейджером x20</p>
          </div>
          <div className="bg-[#252a39] p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Розыгрыши призов</h3>
            <p className="text-gray-300">Ежедневные розыгрыши за пополнение от 100₽</p>
          </div>
        </div>

        {/* Информация о пополнении */}
        <div className="bg-[#252a39] rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Пополнение и вывод средств</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Пополнение</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Минимальная сумма пополнения: 100₽</li>
                <li>Поддержка ЮMoney и банковских карт</li>
                <li>Мгновенное зачисление средств</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Вывод</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Минимальная сумма вывода: 500₽</li>
                <li>Вывод на банковские карты</li>
                <li>Поддержка популярных криптовалют</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Футер */}
      <footer className="bg-[#121620] py-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">© 2025 RuletDice. Все права защищены.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/terms" className="text-gray-400 hover:text-[#9b87f5]">
                Пользовательское соглашение
              </Link>
              <Link to="/support" className="text-gray-400 hover:text-[#9b87f5]">
                Поддержка
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Здесь должны быть модальные окна для входа/регистрации */}
    </div>
  );
};

export default Index;
