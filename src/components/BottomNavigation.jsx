import { useNavigate, useLocation } from 'react-router-dom';

function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: '🏠', label: 'Главная' },
    { path: '/training', icon: '💪', label: 'Тренировки' },
    { path: '/nutrition', icon: '🍎', label: 'Питание' },
    { path: '/profile', icon: '👤', label: 'Профиль' },
    { path: '/coach', icon: '🤖', label: 'Коуч' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 z-50">
      <div className="flex justify-around items-center p-3">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center ${
              isActive(item.path) ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isActive(item.path) ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <span>{item.icon}</span>
            </div>
            <span className={`text-xs mt-1 ${isActive(item.path) ? 'font-medium' : ''}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default BottomNavigation;