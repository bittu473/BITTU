import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { useShop } from '../App';
import { ProductCard } from '../components/ProductCard';
import { ChevronRight } from 'lucide-react';

export const Home: React.FC = () => {
  const { products } = useShop();

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* Categories Nav */}
      <div className="bg-white shadow-sm mb-2 overflow-x-auto">
        <div className="container mx-auto px-2 py-3 flex justify-between md:justify-center gap-4 md:gap-12 min-w-max">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={`/products?category=${cat.id}`} className="flex flex-col items-center group cursor-pointer">
              <div className="w-16 h-16 mb-1 overflow-hidden rounded-md">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-xs font-bold text-gray-700 group-hover:text-bv-blue">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Hero Banner */}
      <div className="container mx-auto px-2 mb-4">
        <div className="relative w-full h-48 md:h-80 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-sm overflow-hidden shadow-md flex items-center">
          <div className="px-8 md:px-16 text-white z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">Big Savings Festival</h1>
            <p className="text-lg md:text-xl mb-4 opacity-90">Up to 70% Off on Electronics & Fashion</p>
            <Link to="/products" className="bg-white text-bv-blue px-6 py-2 font-bold rounded-sm hover:shadow-lg transition shadow">
              Shop Now
            </Link>
          </div>
          <img src="https://picsum.photos/seed/banner/1200/400" alt="Sale" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" />
        </div>
      </div>

      {/* Deal of the Day */}
      <div className="container mx-auto px-2 mb-4">
        <div className="bg-white p-4 shadow-sm rounded-sm">
          <div className="flex justify-between items-center mb-4 border-b pb-3">
            <div>
              <h2 className="text-xl font-medium text-gray-800">Deals of the Day</h2>
              <p className="text-gray-400 text-sm">20 Hours Left</p>
            </div>
            <Link to="/products" className="bg-bv-blue text-white px-4 py-2 rounded-sm text-sm font-medium shadow-sm hover:bg-blue-700">VIEW ALL</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.slice(0, 5).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Best of Electronics */}
      <div className="container mx-auto px-2">
        <div className="flex flex-col md:flex-row gap-2">
          {/* Sidebar Ad */}
          <div className="md:w-1/5 bg-white p-4 shadow-sm flex flex-col items-center justify-center text-center min-h-[300px]">
            <h3 className="text-2xl font-light mb-4">Best of<br/><span className="font-bold">Electronics</span></h3>
            <Link to="/products?category=electronics" className="bg-bv-blue text-white px-4 py-2 rounded-sm shadow hover:bg-blue-700 mb-4">VIEW ALL</Link>
            <img src="https://picsum.photos/seed/electronics_ad/200/300" alt="Ad" className="w-full h-40 object-contain" />
          </div>
          
          {/* Slider Grid */}
          <div className="flex-1 bg-white p-4 shadow-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
             {products.filter(p => p.category === 'electronics').slice(0,4).map(product => (
                <ProductCard key={product.id} product={product} />
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};