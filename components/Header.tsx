import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, User, Heart, LayoutDashboard } from 'lucide-react';
import { useShop } from '../App';

export const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { cart } = useShop();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="bg-bv-blue sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start shrink-0">
            <span className="text-white font-bold text-xl italic tracking-wider">BV MART</span>
            <span className="text-gray-200 text-xs hidden sm:block hover:text-white transition">Explore Plus <span className="text-bv-yellow">✦</span></span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full py-2 px-4 pr-10 rounded-sm focus:outline-none shadow-sm text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-0 top-0 h-full px-3 text-bv-blue">
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Mobile Search Icon (triggers menu or separate view in real app) */}
          <button className="md:hidden text-white">
            <Search size={24} />
          </button>

          {/* Nav Items */}
          <div className="flex items-center gap-6">
            
            {/* Admin Link - For demo purposes, accessible directly */}
            <Link to="/admin" className="text-white font-medium flex items-center gap-1 hover:text-gray-200 hidden lg:flex">
              <LayoutDashboard size={18} />
              <span>Admin</span>
            </Link>

            <Link to="/dashboard" className="bg-white text-bv-blue font-semibold px-6 py-1 rounded-sm hover:bg-bv-blue hover:text-white hover:border hover:border-white transition hidden md:block">
              Login
            </Link>

            <Link to="/dashboard" className="text-white font-medium flex items-center gap-1 hover:text-gray-200">
               <User size={20} className="md:hidden" />
               <span className="hidden md:block">My Account</span>
            </Link>

            <Link to="/" className="text-white font-medium flex items-center gap-1 hover:text-gray-200 hidden md:flex">
              <Heart size={20} />
              <span>Wishlist</span>
            </Link>

            <Link to="/cart" className="text-white font-medium flex items-center gap-2 hover:text-gray-200">
              <div className="relative">
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-bv-yellow text-bv-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-white">
                    {cart.length}
                  </span>
                )}
              </div>
              <span className="hidden md:block">Cart</span>
            </Link>
          </div>
        </div>
        
        {/* Mobile Search Bar (visible only on small screens) */}
        <div className="mt-3 md:hidden">
           <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 rounded-sm focus:outline-none shadow-sm text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-2 text-gray-500">
                <Search size={18} />
              </button>
           </form>
        </div>
      </div>
    </header>
  );
};