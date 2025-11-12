import React, { useState, useEffect } from 'react';
import { staticApi as api } from '../services/staticApi';
import BottomNavigation from '../components/BottomNavigation';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [nutrition, setNutrition] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const userData = await api.getUser();
    const workoutsData = await api.getWorkouts();
    const nutritionData = await api.getNutrition();
    
    setUser(userData);
    setWorkouts(workoutsData);
    setNutrition(nutritionData);
  };

  if (!user) return <div className="p-6">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-20"> {/* pb-20 для места под навигацию */}
      {/* Заголовок */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">FitCore</h1>
      </div>

      {/* Сегодняшняя тренировка */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Сегодняшняя тренировка</h2>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-blue-600 font-bold text-xl">Силовая тренировка</p>
          <p className="text-gray-600 mt-1">10:00 - 11:00</p>
        </div>
      </div>

      {/* Быстрая статистика */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Быстрая статистика</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
            <p className="text-gray-600 text-sm">Калории</p>
            <p className="text-2xl font-bold text-gray-800">2500</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
            <p className="text-gray-600 text-sm">Шаги</p>
            <p className="text-2xl font-bold text-gray-800">10000</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
          <p className="text-gray-600 text-sm">Км</p>
          <p className="text-2xl font-bold text-gray-800">7.5</p>
        </div>
      </div>

      {/* Персонализированные цели */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Персонализированные цели</h2>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Пройти 10000 шагов</span>
          <span className="text-blue-600 font-bold">75%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-blue-600 h-4 rounded-full transition-all duration-300" 
            style={{ width: '75%' }}
          ></div>
        </div>

        {/* Дополнительная статистика */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">99</div>
            <div className="text-sm text-gray-600">Дней подряд</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">95%</div>
            <div className="text-sm text-gray-600">Выполнение</div>
          </div>
        </div>
      </div>

      {/* Приветствие пользователя */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Добро пожаловать, <span className="font-semibold text-blue-600">{user.name}</span>!
        </p>
        {user.premium && (
          <span className="inline-block mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm">
            🏆 Премиум
          </span>
        )}
      </div>

      {/* Навигация */}
      <BottomNavigation />
    </div>
  );
}

export default Dashboard;