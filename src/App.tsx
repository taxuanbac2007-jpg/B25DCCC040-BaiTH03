import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Detail } from './pages/Detail';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Checkout } from './pages/Checkout';
import { NotFound } from './pages/NotFound';
import { ProtectedRoute } from './context/AppContext';

const Layout: React.FC = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col transition-colors">
    <Header />
    <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6"><Outlet /></main>
  </div>
);

export const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="products/:id" element={<Detail />} />
      <Route path="cart" element={<Cart />} />
      <Route path="login" element={<Login />} />
      <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;