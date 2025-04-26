
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";

const SupportPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Имитация отправки сообщения
    setTimeout(() => {
      toast({
        title: "Сообщение отправлено",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      setName("");
      setEmail("");
      setMessage("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-950 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Поддержка</h1>
          <Link to="/">
            <Button variant="outline" className="border-purple-400 text-white hover:bg-purple-800">На главную</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Card className="bg-white/10 backdrop-blur-md border-purple-400/20 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Свяжитесь с нами</CardTitle>
                <CardDescription className="text-purple-200">
                  У вас есть вопросы? Мы готовы помочь!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Ваше имя</Label>
                    <Input
                      id="name"
                      placeholder="Введите ваше имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/20 border-purple-400/30 text-white placeholder:text-purple-200/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Электронная почта</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Введите ваш email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/20 border-purple-400/30 text-white placeholder:text-purple-200/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Сообщение</Label>
                    <Textarea
                      id="message"
                      placeholder="Опишите вашу проблему или задайте вопрос"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[120px] bg-white/20 border-purple-400/30 text-white placeholder:text-purple-200/50"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    {loading ? "Отправка..." : "Отправить сообщение"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-purple-400/20">
              <CardHeader>
                <CardTitle className="text-white">Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm">Email:</p>
                    <p className="text-white">support@dicecasino.ru</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm">Телеграм:</p>
                    <p className="text-white">@dice_casino_support</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm">Время работы:</p>
                    <p className="text-white">24/7, без выходных</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-white/10 backdrop-blur-md border-purple-400/20">
              <CardHeader>
                <CardTitle className="text-white">Часто задаваемые вопросы</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="text-white">
                  <AccordionItem value="item-1" className="border-purple-400/30">
                    <AccordionTrigger className="text-white hover:text-purple-300">
                      Как начать игру в Dice?
                    </AccordionTrigger>
                    <AccordionContent className="text-purple-200">
                      Для начала игры необходимо зарегистрироваться, пополнить баланс и перейти на страницу игры Dice. 
                      Установите размер ставки, выберите шанс выигрыша и нажмите кнопку "Играть". 
                      Подробнее о правилах игры вы можете прочитать в разделе "Правила".
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="border-purple-400/30">
                    <AccordionTrigger className="text-white hover:text-purple-300">
                      Как пополнить баланс?
                    </AccordionTrigger>
                    <AccordionContent className="text-purple-200">
                      Для пополнения баланса перейдите в личный кабинет, выберите вкладку "Пополнение" и укажите 
                      сумму пополнения. Минимальная сумма пополнения составляет 100 рублей. 
                      Мы поддерживаем различные способы оплаты, включая банковские карты, электронные кошельки и криптовалюты.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3" className="border-purple-400/30">
                    <AccordionTrigger className="text-white hover:text-purple-300">
                      Как вывести выигрыш?
                    </AccordionTrigger>
                    <AccordionContent className="text-purple-200">
                      Для вывода средств перейдите в личный кабинет, выберите вкладку "Вывод" и укажите сумму и способ вывода. 
                      Минимальная сумма вывода составляет 500 рублей. Обработка заявок на вывод средств происходит в течение 24 часов.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4" className="border-purple-400/30">
                    <AccordionTrigger className="text-white hover:text-purple-300">
                      Что такое бонусный баланс?
                    </AccordionTrigger>
                    <AccordionContent className="text-purple-200">
                      Бонусный баланс — это средства, которые вы получаете в качестве бонуса за регистрацию или по промокоду. 
                      Для вывода бонусных средств необходимо выполнить условия отыгрыша (вейджер x20). 
                      Например, если вы получили бонус 1500 рублей, необходимо сделать ставок на сумму 30000 рублей.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5" className="border-purple-400/30">
                    <AccordionTrigger className="text-white hover:text-purple-300">
                      Как активировать промокод?
                    </AccordionTrigger>
                    <AccordionContent className="text-purple-200">
                      Для активации промокода перейдите в личный кабинет, найдите поле "Промокод", введите промокод и нажмите кнопку "Активировать". 
                      Если промокод действителен, бонус будет начислен на ваш счет автоматически.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6" className="border-purple-400/30">
                    <AccordionTrigger className="text-white hover:text-purple-300">
                      Как работает шанс выигрыша в Dice?
                    </AccordionTrigger>
                    <AccordionContent className="text-purple-200">
                      В игре Dice шанс выигрыша определяется выбранным вами значением. Например, если выбрать шанс выигрыша 50%, 
                      то выигрыш будет при выпадении числа от 0 до 49.99. Чем меньше шанс выигрыша, тем выше коэффициент выплаты.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-7" className="border-purple-400/30">
                    <AccordionTrigger className="text-white hover:text-purple-300">
                      Что делать, если я забыл пароль?
                    </AccordionTrigger>
                    <AccordionContent className="text-purple-200">
                      Если вы забыли пароль, воспользуйтесь функцией "Забыли пароль?" на странице входа. 
                      Вам на email придет инструкция по восстановлению пароля. 
                      Если у вас возникли проблемы, обратитесь в службу поддержки.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
