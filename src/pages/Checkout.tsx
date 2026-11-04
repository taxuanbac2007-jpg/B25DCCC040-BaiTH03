import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { clearCart } from '../redux/slice';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Checkout: React.FC = () => {
  const items = useAppSelector(state => state.cart.items);
  const total = useAppSelector(state => state.cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0));
  const dispatch = useAppDispatch();
  const [ordered, setOrdered] = useState(false);

  if (ordered) return <div className="max-w-md mx-auto text-center py-20 space-y-4 bg-white dark:bg-gray-800 border dark:border-gray-700 p-8 rounded-2xl"><CheckCircle2 size={64} className="mx-auto text-green-500" /><h1 className="text-2xl font-bold">Đặt hàng thành công!</h1><Link to="/" className="inline-block bg-indigo-600 text-white px-6 py-2.5 rounded-xl">Tiếp tục mua sắm</Link></div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Thanh toán</h1>
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6 space-y-4">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex justify-between items-center text-sm">
            <span className="line-clamp-1 mr-4">{product.title} (x{quantity})</span>
            <span className="font-medium">${(product.price * quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-4 dark:border-gray-700 flex justify-between font-bold text-lg"><span>Tổng cộng:</span><span className="text-indigo-600">${total.toFixed(2)}</span></div>
        <button onClick={() => { dispatch(clearCart()); setOrdered(true); }} className="w-full bg-green-600 text-white py-3 rounded-xl font-medium">Đặt hàng</button>
      </div>
    </div>
  );
};