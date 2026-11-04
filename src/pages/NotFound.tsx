import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => (
  <div className="text-center py-20 space-y-4">
    <h1 className="text-6xl font-bold text-indigo-600">404</h1>
    <p className="text-xl font-medium">Trang không tồn tại.</p>
    <Link to="/" className="inline-block bg-indigo-600 text-white px-6 py-2.5 rounded-xl">Trang chủ</Link>
  </div>
);