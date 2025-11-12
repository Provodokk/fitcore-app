// Статические данные для деплоя (работают без бэкенда)
export const staticApi = {
  // Получить тренировки
  async getWorkouts() {
    return [
      { id: 1, name: "Силовая тренировка", duration: 60, completed: false },
      { id: 2, name: "Кардио", duration: 30, completed: true }
    ];
  },

  // Получить данные пользователя
  async getUser() {
    return {
      name: "Алексей Кучин", 
      premium: true,
      joined: "2022"
    };
  },

  // Получить данные питания
  async getNutrition() {
    return {
      consumed: 1500,
      target: 2000,
      meals: [
        { type: "breakfast", protein: 20, fat: 15, carbs: 30 },
        { type: "lunch", protein: 30, fat: 25, carbs: 40 },
        { type: "dinner", protein: 25, fat: 20, carbs: 35 },
        { type: "snacks", protein: 10, fat: 5, carbs: 15 }
      ]
    };
  },

  // Пустые функции для совместимости
  async completeWorkout() {
    return { success: true };
  },
  
  async addMeal() {
    return { success: true };
  },
  
  async updateProgress() {
    return { success: true };
  }
};