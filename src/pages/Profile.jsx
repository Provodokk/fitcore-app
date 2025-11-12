import { useState, useEffect } from 'react';
import { api } from '../services/api';
import BottomNavigation from '../components/BottomNavigation';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const userData = await api.getUser();
    setUser(userData);
  };

  if (!user) return <div className="p-6">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-20">
      {/* Заголовок */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Профиль</h1>
      </div>

      {/* Информация пользователя */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
          {user.name.split(' ').map(n => n[0]).join('')}
        </div>
        
        <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
        <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold mt-2">
          {user.premium ? '🏆 Премиум' : 'Базовый'}
        </div>
        <p className="text-gray-600 mt-2">Присоединился в {user.joined}</p>
      </div>

      {/* Достижения */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Достижения</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
            <p className="text-2xl font-bold text-blue-600">120</p>
            <p className="text-sm text-gray-600">Тренировки</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
            <p className="text-2xl font-bold text-green-600">-2 кг</p>
            <p className="text-sm text-gray-600">Вес</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Выполнение</p>
          <p className="text-2xl font-bold text-purple-600">95%</p>
        </div>
      </div>

      {/* Ежемесячный обзор */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
        <h2 className="text-lg font-semibold mb-2">Ежемесячный обзор</h2>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-3xl font-bold">120</p>
            <p className="text-blue-100">Тренировки</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold">Июнь</p>
            <p className="text-blue-100">2024</p>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default Profile;