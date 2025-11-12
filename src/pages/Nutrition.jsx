import { useState, useEffect } from 'react';
import { staticApi as api } from '../services/staticApi';
import BottomNavigation from '../components/BottomNavigation';

function Nutrition() {
  const [nutrition, setNutrition] = useState(null);

  useEffect(() => {
    loadNutrition();
  }, []);

  const loadNutrition = async () => {
    const nutritionData = await api.getNutrition();
    setNutrition(nutritionData);
  };

  if (!nutrition) return <div className="p-6">Загрузка...</div>;

  const progress = (nutrition.consumed / nutrition.target) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-20">
      {/* Заголовок */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Питание</h1>
      </div>

      {/* Счётчик калорий */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200 text-center">
        <div className="text-4xl font-bold text-gray-800 mb-2">
          {nutrition.consumed} <span className="text-2xl text-gray-500">/ {nutrition.target} ккал</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-green-500 h-4 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {progress < 100 ? `Осталось ${nutrition.target - nutrition.consumed} ккал` : 'Дневная норма достигнута!'}
        </p>
      </div>

      {/* Приёмы пищи */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Приемы пищи</h2>
        
        <div className="space-y-4">
          {nutrition.meals.map((meal, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-800 capitalize">{meal.type === 'breakfast' ? 'Завтрак' : 
                                                                        meal.type === 'lunch' ? 'Обед' : 
                                                                        meal.type === 'dinner' ? 'Ужин' : 'Перекусы'}</span>
                <span className="text-sm text-gray-600">{meal.protein + meal.fat + meal.carbs * 4} ккал</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Белки</p>
                  <p className="font-bold text-blue-600">{meal.protein}г</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Жиры</p>
                  <p className="font-bold text-yellow-600">{meal.fat}г</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Углеводы</p>
                  <p className="font-bold text-green-600">{meal.carbs}г</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-blue-500 text-white py-3 px-4 rounded-xl font-semibold text-center shadow-lg hover:bg-blue-600 transition">
          Генерация рецепта с ИИ
        </button>
        <button className="bg-green-500 text-white py-3 px-4 rounded-xl font-semibold text-center shadow-lg hover:bg-green-600 transition">
          Добавить по штрих-коду
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default Nutrition;