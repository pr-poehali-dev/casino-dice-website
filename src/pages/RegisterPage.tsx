
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Имя пользователя обязательно";
    } else if (formData.username.length < 3) {
      newErrors.username = "Имя пользователя должно быть не менее 3 символов";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }
    
    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен быть не менее 6 символов";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Здесь в реальном приложении был бы запрос к API
    setTimeout(() => {
      // Проверка, не занято ли имя пользователя
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = existingUsers.some(
        (user: any) => user.username === formData.username || user.email === formData.email
      );
      
      if (userExists) {
        setErrors({
          username: "Пользователь с таким именем или email уже существует",
        });
        setIsLoading(false);
        return;
      }
      
      // Создание нового пользователя
      const newUser = {
        id: Date.now(),
        username: formData.username,
        email: formData.email,
        password: formData.password, // В реальном приложении пароль должен быть захеширован
        balance: 0,
        bonusBalance: 1500, // Бонусный баланс для новых пользователей
        wagering: 1500 * 20, // Отыгрыш бонуса х20
        registrationDate: new Date().toISOString(),
        transactions: [],
        gameHistory: [],
      };
      
      // Сохранение пользователя в localStorage
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      
      // Авторизация пользователя
      const userData = {
        username: newUser.username,
        balance: newUser.balance,
        bonusBalance: newUser.bonusBalance,
        wagering: newUser.wagering,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      
      toast({
        title: "Регистрация успешна!",
        description: "Добро пожаловать в RuletDice. Бонус 1500₽ уже зачислен на ваш бонусный счет!",
      });
      
      navigate("/game");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] flex flex-col">
      <header className="bg-[#121620] py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-[#9b87f5]">
            RuletDice
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-8">
        <div className="bg-[#252a39] rounded-lg p-8 shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-white text-center">Регистрация</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">Имя пользователя</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="bg-[#1A1F2C] border-[#3a4056] text-white"
                placeholder="Введите имя пользователя"
              />
              {errors.username && (
                <p className="text-red-400 text-sm">{errors.username}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-[#1A1F2C] border-[#3a4056] text-white"
                placeholder="Введите email"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Пароль</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-[#1A1F2C] border-[#3a4056] text-white"
                placeholder="Введите пароль"
              />
              {errors.password && (
                <p className="text-red-400 text-sm">{errors.password}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">Подтверждение пароля</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-[#1A1F2C] border-[#3a4056] text-white"
                placeholder="Подтвердите пароль"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
            
            <div className="bg-[#1A1F2C] p-4 rounded-lg border border-[#3a4056] mt-4">
              <p className="text-[#ffd700] font-medium">БОНУС ДЛЯ НОВЫХ ИГРОКОВ</p>
              <p className="text-sm text-gray-400">
                Зарегистрируйтесь и получите 1500₽ на бонусный счет с вейджером x20
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Регистрация...
                </span>
              ) : (
                "Зарегистрироваться"
              )}
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-gray-400">
                Уже есть аккаунт?{" "}
                <Link to="/login" className="text-[#9b87f5] hover:underline">
                  Войти
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>

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
    </div>
  );
};

export default RegisterPage;
