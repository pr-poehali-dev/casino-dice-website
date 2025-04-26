
import { useState, useEffect } from "react";
import { Users } from "lucide-react";

const OnlineCounter = () => {
  const [onlineCount, setOnlineCount] = useState(0);
  
  useEffect(() => {
    // Генерируем начальное количество онлайн-пользователей
    const baseCount = Math.floor(Math.random() * 300) + 150;
    setOnlineCount(baseCount);
    
    // Имитируем изменение числа онлайн пользователей
    const interval = setInterval(() => {
      // Случайно увеличиваем или уменьшаем количество на 1-3 человека
      const change = Math.floor(Math.random() * 3) + 1;
      const increase = Math.random() > 0.5;
      
      setOnlineCount(prev => {
        // Ограничиваем диапазон от 100 до 500
        const newCount = increase ? prev + change : prev - change;
        return Math.max(100, Math.min(500, newCount));
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-dice-primary/20 rounded-full text-sm">
      <Users className="w-4 h-4 text-dice-primary" />
      <span className="text-dice-primary/90 font-medium">{onlineCount}</span>
      <span className="text-dice-primary/70">онлайн</span>
    </div>
  );
};

export default OnlineCounter;
