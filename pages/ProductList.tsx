import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../App';
import { CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Filter, ChevronDown } from 'lucide-react';

export const ProductList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { products } = useShop();
  const categoryFilter = searchParams.get('category');
  const searchTerm = searchParams.get('q');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
      const matchesSearch = searchTerm 
        ? p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchTerm, products]);

  return (
    <div className="min-h-screen bg-gray-100 pt-4 pb-10">
      <div className="container mx-auto px-2 flex flex-col md:flex-row gap-4">
        {/* Sidebar Filters (Desktop) */}
        <div className="hidden md:block w-64 bg-white shadow-sm rounded-sm p-4 h-fit sticky top-20">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-lg font-medium">Filters</h2>
            <Filter size={18} className="text-gray-500" />
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-600 uppercase mb-2">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="/#/products" className={`hover:text-bv-blue ${!categoryFilter ? 'font-bold' : ''}`}>All Products</a></li>
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <a href={`/#/products?category=${cat.id}`} className={`hover:text-bv-blue ${categoryFilter === cat.id ? 'font-bold' : ''}`}>
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
             <h3 className="text-xs font-bold text-gray-600 uppercase mb-2">Price</h3>
             <div className="flex items-center gap-2 text-sm">
                <select className="border p-1 rounded w-full"><option>Min</option><option>500</option></select>
                <span className="text-gray-400">to</span>
                <select className="border p-1 rounded w-full"><option>Max</option><option>10000+</option></select>
             </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white p-4 shadow-sm rounded-sm mb-4 flex justify-between items-center">
             <div>
                <span className="font-medium text-gray-800">BV Mart</span>
                <span className="text-gray-500 text-sm ml-2">
                  {searchTerm ? `Results for "${searchTerm}"` : categoryFilter ? `Category: ${categoryFilter}` : 'All Products'}
                </span>
                <span className="text-gray-400 text-sm ml-2">({filteredProducts.length} items)</span>
             </div>
             <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Sort By
                <div className="flex gap-4 ml-2">
                   <button className="text-bv-blue border-b-2 border-bv-blue pb-0.5">Popularity</button>
                   <button className="hover:text-bv-blue">Price -- Low to High</button>
                   <button className="hover:text-bv-blue">Price -- High to Low</button>
                </div>
             </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-10 text-center shadow-sm rounded-sm">
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png" alt="No results" className="mx-auto h-40 mb-4 opacity-80" />
              <h3 className="text-xl font-bold text-gray-700">Sorry, no results found!</h3>
              <p className="text-gray-500 mt-2">Please check the spelling or try searching for something else</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};