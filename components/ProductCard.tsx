import React from 'react';
import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="bg-white border border-gray-200 rounded-sm hover:shadow-xl transition-shadow duration-200 flex flex-col h-full group overflow-hidden">
      <div className="relative p-4 flex justify-center items-center h-52 bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" 
        />
        <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors">
          <Heart size={20} fill="currentColor" className="text-transparent hover:text-red-500" />
        </button>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-gray-800 hover:text-bv-blue mb-1 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
            {product.rating} <Star size={10} fill="white" />
          </div>
          <span className="text-gray-500 text-xs">({product.reviews})</span>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            <span className="text-xs text-green-600 font-bold">{product.discount}% off</span>
          </div>
          {product.price > 500 && (
             <span className="text-xs text-gray-500 font-medium">Free delivery</span>
          )}
        </div>
      </div>
    </Link>
  );
};
