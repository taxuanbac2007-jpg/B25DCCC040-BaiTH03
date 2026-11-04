import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Sun, Moon, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth, useTheme } from '../context/AppContext';
import { useAppSelector } from '../redux/store';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const totalQty = useAppSelector((state) => state.cart.items.reduce((sum, i) => sum + i.quantity, 0));
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">ShopMini</Link>
        <div className="flex items-center space-x-6">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link to="/cart" className="relative p-2 text-gray-700 dark:text-gray-200">
            <ShoppingCart size={22} />
            {totalQty > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium flex items-center"><UserIcon size={16} className="mr-1" /> {user.username}</span>
              <button onClick={() => { logout(); navigate('/login'); }} className="text-sm text-red-600 flex items-center font-medium">
                <LogOut size={16} className="mr-1" /> Đăng xuất
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Đăng nhập</Link>
          )}
        </div>
      </div>
    </header>
  );
};