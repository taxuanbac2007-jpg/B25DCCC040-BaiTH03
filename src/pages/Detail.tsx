import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, addToCart } from '../redux/slice';
import { useAppDispatch } from '../redux/store';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

export const Detail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div className="text-center py-20">Đang tải chi tiết...</div>;

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center text-indigo-600 font-medium"><ArrowLeft size={16} className="mr-1" /> Quay lại</button>
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center bg-gray-50 dark:bg-gray-900 p-6 rounded-xl h-96">
          <img src={product.image} alt={product.title} className="max-h-full object-contain" />
        </div>
        <div className="space-y-4">
          <span className="text-xs text-indigo-600 uppercase font-semibold">{product.category}</span>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-2xl font-bold text-indigo-600">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
          <button onClick={() => dispatch(addToCart(product))} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2">
            <ShoppingCart size={20} /><span>Thêm vào giỏ hàng</span>
          </button>
        </div>
      </div>
    </div>
  );
};