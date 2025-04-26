
import { useEffect, useState } from "react";

interface WinItem {
  id: number;
  username: string;
  amount: number;
  game: string;
  time: string;
}

const generateFakeWin = (id: number): WinItem => {
  const names = ["Александр", "Мария", "Иван", "Екатерина", "Дмитрий", "Ольга", "Сергей", "Анна", "Николай", "Виктория"];
  const username = `${names[Math.floor(Math.random() * names.length)]}${Math.floor(Math.random() * 1000)}`;
  const amount = Math.floor(Math.random() * 10000) + 100;
  const games = ["Dice", "Roulette", "Crash"];
  const game = games[Math.floor(Math.random() * games.length)];
  
  const now = new Date();
  const minutes = Math.floor(Math.random() * 60);
  now.setMinutes(now.getMinutes() - minutes);
  const time = `${minutes} мин. назад`;
  
  return { id, username, amount, game, time };
};

const WinTape = () => {
  const [wins, setWins] = useState<WinItem[]>([]);
  
  useEffect(() => {
    // Генерируем начальные данные
    const initialWins = Array.from({ length: 20 }, (_, i) => generateFakeWin(i));
    setWins(initialWins);
    
    // Добавляем новые выигрыши каждые несколько секунд
    const interval = setInterval(() => {
      setWins(prevWins => {
        const newWins = [...prevWins];
        newWins.unshift(generateFakeWin(Date.now()));
        return newWins.slice(0, 20); // Сохраняем только 20 элементов
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bg-[#252a39] rounded-lg overflow-hidden">
      <div className="animate-[slide-left_30s_linear_infinite] whitespace-nowrap inline-block">
        {wins.map((win) => (
          <div 
            key={win.id} 
            className="inline-block mx-2 my-3 px-4 py-2 bg-[#1A1F2C] rounded-lg border border-[#3a4056]"
          >
            <span className="font-medium text-[#9b87f5]">{win.username}</span>
            <span className="mx-2">выиграл</span>
            <span className="font-bold text-green-400">{win.amount}₽</span>
            <span className="mx-2">в</span>
            <span className="font-medium">{win.game}</span>
            <span className="ml-2 text-sm text-gray-400">{win.time}</span>
          </div>
        ))}
        
        {/* Дублируем элементы для бесшовной анимации */}
        {wins.map((win) => (
          <div 
            key={`dup-${win.id}`} 
            className="inline-block mx-2 my-3 px-4 py-2 bg-[#1A1F2C] rounded-lg border border-[#3a4056]"
          >
            <span className="font-medium text-[#9b87f5]">{win.username}</span>
            <span className="mx-2">выиграл</span>
            <span className="font-bold text-green-400">{win.amount}₽</span>
            <span className="mx-2">в</span>
            <span className="font-medium">{win.game}</span>
            <span className="ml-2 text-sm text-gray-400">{win.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinTape;
