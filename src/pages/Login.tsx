import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AppContext';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) navigate(from, { replace: true });
    else setError('Mật khẩu sai! (Mật khẩu: 123456)');
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-center mb-6">Đăng nhập ShopMini</h1>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm rounded-lg">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label className="block text-sm font-medium mb-1">Tên đăng nhập</label><input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-2 border rounded-xl dark:bg-gray-900 dark:border-gray-700" /></div>
        <div><label className="block text-sm font-medium mb-1">Mật khẩu (123456)</label><input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-xl dark:bg-gray-900 dark:border-gray-700" /></div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium">Đăng nhập</button>
      </form>
    </div>
  );
};