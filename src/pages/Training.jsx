import React, { useState, useEffect } from 'react';
import { staticApi as api } from '../services/staticApi';
import BottomNavigation from '../components/BottomNavigation';

function Training() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    const workoutsData = await api.getWorkouts();
    setWorkouts(workoutsData);
  };

  const toggleWorkout = (id) => {
    setWorkouts(workouts.map(workout => 
      workout.id === id 
        ? { ...workout, completed: !workout.completed }
        : workout
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-20">
      {/* Заголовок */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Тренировки</h1>
      </div>

      {/* Календарь недели */}
      <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 border border-gray-200">
        <div className="grid grid-cols-7 gap-2 text-center">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
            <div key={day} className={`py-2 rounded-lg ${index === 2 ? 'bg-blue-100 text-blue-600 font-bold' : 'text-gray-600'}`}>
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Тренировка на сегодня */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Тренировка на сегодня</h2>
        
        {workouts.map(workout => (
          <div key={workout.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-2 border border-gray-200">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                checked={workout.completed}
                onChange={() => toggleWorkout(workout.id)}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <div className="ml-3">
                <p className="font-medium text-gray-800">{workout.name}</p>
                <p className="text-sm text-gray-600">{workout.duration} минут</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${workout.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
              {workout.completed ? 'Выполнено' : 'Не начато'}
            </span>
          </div>
        ))}
      </div>

      {/* Упражнения */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Упражнения</h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center">
              <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
              <div className="ml-3">
                <p className="font-medium text-gray-800">Приседания</p>
                <p className="text-sm text-gray-600">3 подхода по 12 повторений</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center">
              <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
              <div className="ml-3">
                <p className="font-medium text-gray-800">Отжимания</p>
                <p className="text-sm text-gray-600">3 подхода по 10 повторений</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center">
              <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
              <div className="ml-3">
                <p className="font-medium text-gray-800">Подтягивания</p>
                <p className="text-sm text-gray-600">3 подхода по 15 повторений</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Аналитика от ИИ */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
        <h2 className="text-lg font-semibold mb-2">Еженедельная аналитика от ИИ</h2>
        <p className="text-blue-100">Ваш прогресс анализируется искусственным интеллектом для персонализированных рекомендаций</p>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default Training;