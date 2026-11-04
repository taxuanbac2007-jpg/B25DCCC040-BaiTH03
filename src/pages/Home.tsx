import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchProducts, addToCart } from '../redux/slice';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart } from 'lucide-react';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: products, status, error } = useAppSelector((state) => state.products);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  const filtered = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  if (status === 'loading') return <div className="text-center py-20">Đang tải...</div>;
  if (status === 'failed') return <div className="text-center py-20 text-red-500">Lỗi: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        <input type="text" placeholder="Tìm kiếm sản phẩm..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-xl dark:bg-gray-900 dark:border-gray-700" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(product => (
          <div key={product.id} className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
            <Link to={`/products/${product.id}`} className="p-4 flex justify-center bg-gray-50 dark:bg-gray-900 h-48">
              <img src={product.image} alt={product.title} className="max-h-full object-contain" />
            </Link>
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <span className="text-xs text-indigo-600 font-semibold uppercase">{product.category}</span>
                <Link to={`/products/${product.id}`}><h3 className="font-medium line-clamp-1 mt-1">{product.title}</h3></Link>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                <button onClick={() => dispatch(addToCart(product))} className="bg-indigo-600 text-white p-2 rounded-lg"><ShoppingCart size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};