import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';

function CoachChat() {
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Привет, Алексей! Я ваш AI фитнес-коуч. Чем я могу вам помочь сегодня?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Авто-прокрутка к новым сообщениям
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Если перешли с предустановленным вопросом
  useEffect(() => {
    if (location.state?.initialQuestion) {
      setInputMessage(location.state.initialQuestion);
    }
  }, [location]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Имитация ответа AI
    setTimeout(() => {
      const aiResponses = {
        "сушк": "Вижу, вы на сушке и вес встал. Проанализировав ваши данные, рекомендую:\n\n1. Увеличить кардио на 15%\n2. Снизить углеводы на 20г\n3. Добавить интервальные тренировки\n4. Проверить водный баланс",
        "похуден": "Для эффективного похудения рекомендую:\n\n• Дефицит калорий 20%\n• Силовые 3 раза в неделю\n• Кардио 4 раза по 30 мин\n• Белок 2г на кг веса",
        "бег": "Чтобы улучшить время бега:\n\n1. Интервальные тренировки 2 раза в неделю\n2. Силовые упражнения на ноги\n3. Растяжка после каждой тренировки\n4. Постепенное увеличение дистанции",
        "протеин": "Рекомендуемая норма протеина:\n\n• Для похудения: 2-2.5г на кг веса\n• Для набора массы: 1.6-2.2г на кг веса\n• Для поддержания: 1.2-1.6г на кг веса"
      };

      const lowerMessage = userMessage.text.toLowerCase();
      let aiResponse = "Отличный вопрос! На основе ваших данных и целей, я рекомендую персонализированный подход к тренировкам и питанию. Можете уточнить какие-то конкретные аспекты?";

      for (const [key, response] of Object.entries(aiResponses)) {
        if (lowerMessage.includes(key)) {
          aiResponse = response;
          break;
        }
      }

      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 flex flex-col">
      {/* Заголовок */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/coach')}
            className="text-gray-500 hover:text-gray-700"
          >
            ← Назад
          </button>
          <h1 className="text-xl font-bold text-gray-800">AI Коуч</h1>
          <div className="w-6"></div> {/* Для выравнивания */}
        </div>
      </div>

      {/* Сообщения */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.isUser
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-white border border-gray-200 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-line">{message.text}</p>
              <p className={`text-xs mt-2 ${
                message.isUser ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Поле ввода */}
      <div className="bg-white border-t border-gray-200 p-4 sticky bottom-20">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Задайте вопрос..."
            className="flex-1 border border-gray-300 rounded-xl p-3 resize-none focus:outline-none focus:border-blue-500"
            rows="1"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-blue-500 text-white rounded-xl px-4 py-3 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            📤
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default CoachChat;