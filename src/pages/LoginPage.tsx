
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Специальная проверка для админа
    if (username === "admin2000" && password === "admin2000") {
      toast({
        title: "Успешный вход",
        description: "Вы вошли как администратор",
      });
      
      // В реальном приложении здесь был бы редирект на админ-панель
      setTimeout(() => {
        window.location.href = "/admin";
      }, 1000);
      return;
    }

    // Имитация запроса к серверу
    setTimeout(() => {
      if (username && password) {
        toast({
          title: "Успешный вход",
          description: "Добро пожаловать в Dice Casino!",
        });
        
        // В реальном приложении здесь был бы редирект на главную
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        toast({
          variant: "destructive",
          title: "Ошибка входа",
          description: "Неверное имя пользователя или пароль",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-purple-400/20">
        <CardHeader>
          <CardTitle className="text-2xl text-white text-center">Вход в Dice Casino</CardTitle>
          <CardDescription className="text-purple-200 text-center">
            Войдите в свой аккаунт для доступа к игре
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-white">Имя пользователя</Label>
                <Input
                  id="username"
                  placeholder="Введите имя пользователя"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white/20 border-purple-400/30 text-white placeholder:text-purple-200/50"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-white">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/20 border-purple-400/30 text-white placeholder:text-purple-200/50"
                />
              </div>
              <Button type="submit" disabled={loading} className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                {loading ? "Вход..." : "Войти"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-sm text-purple-200 text-center">
            Нет аккаунта? <Link to="/register" className="text-purple-300 hover:text-white underline">Зарегистрируйтесь</Link>
          </p>
          <p className="text-xs text-purple-300/70 text-center">
            <span className="block">Новым игрокам бонус 1500₽!</span>
            <span className="block">Промокод: FREE150</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
