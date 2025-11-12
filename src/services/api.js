// Файл: src/services/api.js
const API_URL = 'http://localhost:8000';

export const api = {
  // Получить тренировки
  async getWorkouts() {
    try {
      const response = await fetch(`${API_URL}/api/workouts`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Ошибка подключения к API');
      // Возвращаем тестовые данные если API недоступно
      return [
        { id: 1, name: "Силовая тренировка", duration: 60, completed: false },
        { id: 2, name: "Кардио", duration: 30, completed: true }
      ];
    }
  },

  // Получить данные пользователя
  async getUser() {
    try {
      const response = await fetch(`${API_URL}/api/user`);
      const data = await response.json();
      return data;
    } catch (error) {
      return { name: "Алексей Кучин", premium: true, joined: "2022" };
    }
  },

  // Получить данные питания
  async getNutrition() {
    try {
      const response = await fetch(`${API_URL}/api/nutrition`);
      const data = await response.json();
      return data;
    } catch (error) {
      return {
        consumed: 1500,
        target: 2000,
        meals: [
          { type: "breakfast", protein: 20, fat: 15, carbs: 30 },
          { type: "lunch", protein: 30, fat: 25, carbs: 40 }
        ]
      };
    }
  }
};