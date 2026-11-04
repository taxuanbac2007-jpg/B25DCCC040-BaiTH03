import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { removeFromCart, updateQuantity } from '../redux/slice';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export const Cart: React.FC = () => {
  const items = useAppSelector(state => state.cart.items);
  const total = useAppSelector(state => state.cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (items.length === 0) return <div className="text-center py-20 space-y-4"><p className="text-gray-500">Giỏ hàng trống.</p><Link to="/" className="inline-block bg-indigo-600 text-white px-6 py-2.5 rounded-xl">Mua sắm ngay</Link></div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Giỏ hàng</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-4 flex items-center justify-between gap-4">
              <img src={product.image} alt={product.title} className="w-16 h-16 object-contain bg-gray-50 p-2 rounded-lg" />
              <div className="flex-grow">
                <h3 className="font-medium line-clamp-1">{product.title}</h3>
                <p className="text-sm font-semibold text-indigo-600">${product.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))} className="p-1 bg-gray-100 dark:bg-gray-700 rounded"><Minus size={16} /></button>
                <span className="w-8 text-center">{quantity}</span>
                <button onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))} className="p-1 bg-gray-100 dark:bg-gray-700 rounded"><Plus size={16} /></button>
              </div>
              <button onClick={() => dispatch(removeFromCart(product.id))} className="text-red-500 p-2"><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6 h-fit space-y-4">
          <h2 className="text-lg font-bold border-b pb-4 dark:border-gray-700">Tổng quan</h2>
          <div className="flex justify-between font-bold text-lg"><span>Tổng tiền:</span><span className="text-indigo-600">${total.toFixed(2)}</span></div>
          <button onClick={() => navigate('/checkout')} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2"><span>Thanh toán</span><ArrowRight size={18} /></button>
        </div>
      </div>
    </div>
  );
};