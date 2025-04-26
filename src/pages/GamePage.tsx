
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import WinTape from "@/components/WinTape";

interface UserData {
  username: string;
  balance: number;
  bonusBalance: number;
}

const GamePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [betAmount, setBetAmount] = useState(100);
  const [winChance, setWinChance] = useState(10); // 10% шанс
  const [multiplier, setMultiplier] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [hasWon, setHasWon] = useState<boolean | null>(null);

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const userDataStr = localStorage.getItem("user");
    if (!userDataStr) {
      toast({
        title: "Необходима авторизация",
        description: "Для игры необходимо войти в аккаунт",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    try {
      const userData = JSON.parse(userDataStr);
      setUserData(userData);
    } catch (error) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate, toast]);

  // Обновляем множитель при изменении шанса на выигрыш
  useEffect(() => {
    // Формула: 100 / шанс на выигрыш × (1 - комиссия)
    // Предполагаем комиссию в 5%
    const commission = 0.05;
    const newMultiplier = (100 / winChance) * (1 - commission);
    setMultiplier(parseFloat(newMultiplier.toFixed(2)));
  }, [winChance]);

  // Обработчик изменения суммы ставки
  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setBetAmount(value);
    } else {
      setBetAmount(1);
    }
  };

  // Обработчик изменения шанса на выигрыш
  const handleWinChanceChange = (value: number[]) => {
    setWinChance(value[0]);
  };

  // Обработчик нажатия на кнопку ставки
  const handleRoll = () => {
    if (!userData) return;
    
    // Проверка баланса
    if (userData.balance < betAmount) {
      toast({
        title: "Недостаточно средств",
        description: "Пополните баланс для продолжения игры",
        variant: "destructive",
      });
      return;
    }
    
    // Начинаем анимацию
    setIsRolling(true);
    setRollResult(null);
    setHasWon(null);
    
    // Уменьшаем баланс на сумму ставки
    const updatedUserData = {
      ...userData,
      balance: userData.balance - betAmount
    };
    setUserData(updatedUserData);
    localStorage.setItem("user", JSON.stringify(updatedUserData));
    
    // Симулируем задержку для анимации
    setTimeout(() => {
      // Генерируем случайное число от 0 до 100
      const roll = Math.random() * 100;
      setRollResult(parseFloat(roll.toFixed(2)));
      
      // Определяем, выиграл ли пользователь
      const won = roll < winChance;
      setHasWon(won);
      
      // Обновляем баланс при выигрыше
      if (won) {
        const winAmount = betAmount * multiplier;
        const newBalance = updatedUserData.balance + winAmount;
        
        const finalUserData = {
          ...updatedUserData,
          balance: newBalance
        };
        
        setUserData(finalUserData);
        localStorage.setItem("user", JSON.stringify(finalUserData));
        
        toast({
          title: "Поздравляем!",
          description: `Вы выиграли ${winAmount.toFixed(2)}₽`,
          variant: "default",
        });
      } else {
        toast({
          title: "Неудача",
          description: "Попробуйте еще раз!",
          variant: "default",
        });
      }
      
      setIsRolling(false);
    }, 1500);
  };

  if (!userData) {
    return <div className="flex justify-center items-center h-screen bg-[#1A1F2C]">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      {/* Навигационная панель */}
      <header className="bg-[#121620] py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-[#9b87f5]">
            RuletDice
          </a>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[#252a39] rounded-lg px-3 py-2">
              <span className="text-gray-400 mr-2">Баланс:</span>
              <span className="font-bold">{userData.balance.toFixed(2)}₽</span>
            </div>
            <div className="flex items-center bg-[#252a39] rounded-lg px-3 py-2">
              <span className="text-gray-400 mr-2">Бонус:</span>
              <span className="font-bold">{userData.bonusBalance.toFixed(2)}₽</span>
            </div>
            <Button 
              variant="outline" 
              className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white"
              onClick={() => navigate("/account")}
            >
              Личный кабинет
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка - статистика */}
          <div className="bg-[#252a39] rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Информация о счете</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Имя пользователя:</span>
                <span className="font-medium">{userData.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Баланс:</span>
                <span className="font-medium">{userData.balance.toFixed(2)}₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Бонусный баланс:</span>
                <span className="font-medium">{userData.bonusBalance.toFixed(2)}₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Отыграть:</span>
                <span className="font-medium">{(userData.bonusBalance * 20).toFixed(2)}₽</span>
              </div>
              <div className="pt-4">
                <Button 
                  className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
                  onClick={() => navigate("/account")}
                >
                  Пополнить баланс
                </Button>
              </div>
            </div>
          </div>
          
          {/* Центральная колонка - игра */}
          <div className="lg:col-span-2 bg-[#252a39] rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Dice</h2>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span>Сумма ставки</span>
                <span>Доступно: {userData.balance.toFixed(2)}₽</span>
              </div>
              <Input
                type="number"
                value={betAmount}
                onChange={handleBetAmountChange}
                min={1}
                className="bg-[#1A1F2C] border-[#3a4056] text-white"
              />
              <div className="grid grid-cols-4 gap-2 mt-2">
                <Button 
                  variant="outline" 
                  className="border-[#3a4056] text-gray-300"
                  onClick={() => setBetAmount(Math.max(1, betAmount / 2))}
                >
                  1/2
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#3a4056] text-gray-300"
                  onClick={() => setBetAmount(betAmount * 2)}
                >
                  x2
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#3a4056] text-gray-300"
                  onClick={() => setBetAmount(100)}
                >
                  Мин
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#3a4056] text-gray-300"
                  onClick={() => setBetAmount(userData.balance)}
                >
                  Макс
                </Button>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span>Шанс выигрыша: {winChance}%</span>
                <span>Множитель: x{multiplier}</span>
              </div>
              <Slider
                value={[winChance]}
                onValueChange={handleWinChanceChange}
                max={95}
                min={1}
                step={1}
                className="my-4"
              />
              <div className="grid grid-cols-5 gap-2">
                <Button 
                  variant="outline" 
                  className="border-[#3a4056] text-gray-300"
                  onClick={() => setWinChance(10)}
                >
                  10%
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#3a4056] text-gray-300"
                  onClick={() => setWinChance(25)}
                >
                  25%
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#3a4056] text-gray-300"
                  onClick={() => setWinChance(50)}
                >
                  50%
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#3a4056] text-gray-300"
                  onClick={() => setWinChance(75)}
                >
                  75%
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#3a4056] text-gray-300"
                  onClick={() => setWinChance(90)}
                >
                  90%
                </Button>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span>Выигрыш при победе:</span>
                <span className="font-bold text-green-400">{(betAmount * multiplier).toFixed(2)}₽</span>
              </div>
            </div>
            
            {/* Результат броска */}
            <div className={`mb-6 p-4 rounded-lg flex items-center justify-center ${
              hasWon === null ? 'bg-[#1A1F2C]' : 
              hasWon ? 'bg-green-900/30' : 'bg-red-900/30'
            }`}>
              {isRolling ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#9b87f5] mx-auto mb-2"></div>
                  <p>Бросаем кости...</p>
                </div>
              ) : rollResult !== null ? (
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-1">
                    {hasWon ? 'Победа!' : 'Неудача!'}
                  </h3>
                  <p>
                    Выпало: <span className="font-bold">{rollResult}</span>
                    {hasWon ? (
                      <span className="text-green-400 ml-2">
                        Вы выиграли {(betAmount * multiplier).toFixed(2)}₽
                      </span>
                    ) : (
                      <span className="text-red-400 ml-2">
                        Требуется: меньше {winChance}
                      </span>
                    )}
                  </p>
                </div>
              ) : (
                <p className="text-gray-400">Сделайте ставку и нажмите "Играть"</p>
              )}
            </div>
            
            <Button 
              className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white text-lg py-6"
              onClick={handleRoll}
              disabled={isRolling || userData.balance < betAmount}
            >
              {isRolling ? 'Бросаем кости...' : 'Играть'}
            </Button>
          </div>
        </div>
        
        {/* Лента выигрышей */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Последние выигрыши</h2>
          <WinTape />
        </div>
      </main>
      
      <footer className="bg-[#121620] py-6 mt-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">© 2025 RuletDice. Все права защищены.</p>
            </div>
            <div className="flex gap-4">
              <a href="/terms" className="text-gray-400 hover:text-[#9b87f5]">
                Пользовательское соглашение
              </a>
              <a href="/support" className="text-gray-400 hover:text-[#9b87f5]">
                Поддержка
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GamePage;
