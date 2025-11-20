import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../App';
import { Star, ShoppingCart, Zap, Tag, RotateCcw, ShieldCheck } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { products, addToCart } = useShop();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-4 pb-10">
      <div className="container mx-auto px-2 bg-white shadow-sm rounded-sm min-h-[80vh]">
        <div className="flex flex-col md:flex-row">
          {/* Left: Image Gallery */}
          <div className="md:w-2/5 p-4 flex flex-col items-center border-r border-gray-100 relative">
             <div className="w-full h-96 flex items-center justify-center p-4 mb-4 relative">
                <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow border border-gray-200 cursor-pointer hover:text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </div>
             </div>
             
             <div className="flex gap-4 w-full px-4">
               <button 
                 onClick={() => addToCart(product)}
                 className="flex-1 bg-bv-yellow text-white py-3 font-bold uppercase rounded-sm shadow-sm hover:shadow-lg flex items-center justify-center gap-2 transition"
               >
                 <ShoppingCart fill="white" size={20} /> Add to Cart
               </button>
               <button className="flex-1 bg-orange-600 text-white py-3 font-bold uppercase rounded-sm shadow-sm hover:shadow-lg flex items-center justify-center gap-2 transition">
                 <Zap fill="white" size={20} /> Buy Now
               </button>
             </div>
          </div>

          {/* Right: Details */}
          <div className="md:w-3/5 p-6">
             <div className="text-sm text-gray-500 mb-2">Home {'>'} {product.category} {'>'} {product.name}</div>
             <h1 className="text-xl md:text-2xl font-medium text-gray-800 mb-2">{product.name}</h1>
             
             <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-600 text-white text-sm font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  {product.rating} <Star size={12} fill="white" />
                </div>
                <span className="text-gray-500 font-medium">{product.reviews} Ratings & Reviews</span>
                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" className="h-5" />
             </div>

             <div className="mb-6">
               <div className="flex items-end gap-3 mb-2">
                 <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                 <span className="text-gray-500 line-through text-lg">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                 <span className="text-green-600 font-bold text-lg">{product.discount}% off</span>
               </div>
               <p className="text-xs font-bold text-gray-700">+ Packaging Fee: ₹49</p>
             </div>

             <div className="space-y-3 mb-6">
                <h3 className="font-medium text-gray-800">Available Offers</h3>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                   <Tag size={16} className="text-green-600 mt-0.5 shrink-0" />
                   <span><strong>Bank Offer</strong> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                   <Tag size={16} className="text-green-600 mt-0.5 shrink-0" />
                   <span><strong>Special Price</strong> Get extra 15% off (price inclusive of discount)</span>
                </div>
             </div>

             {/* Table for features */}
             <div className="border border-gray-200 rounded-sm overflow-hidden mb-6">
               <div className="bg-gray-50 px-4 py-2 font-medium border-b border-gray-200">Product Details</div>
               <div className="p-4">
                 <p className="text-gray-700 mb-4">{product.description}</p>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span> {feature}
                      </li>
                    ))}
                 </ul>
               </div>
             </div>
             
             {/* Services */}
             <div className="flex gap-6 text-sm text-gray-600">
               <div className="flex items-center gap-2"><RotateCcw size={18} className="text-bv-blue"/> 7 Days Replacement Policy</div>
               <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-bv-blue"/> 1 Year Warranty</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};