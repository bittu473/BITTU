import React from 'react';
import { useShop } from '../App';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShieldCheck } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, total } = useShop();
  const discount = cart.reduce((acc, item) => acc + ((item.originalPrice - item.price) * item.quantity), 0);
  const originalTotal = total + discount;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 pt-10 flex justify-center">
         <div className="bg-white shadow-sm rounded-sm p-10 text-center h-fit w-full max-w-2xl">
            <img src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Cart" className="h-48 mx-auto mb-6" />
            <h2 className="text-lg font-medium text-gray-800 mb-2">Your cart is empty!</h2>
            <p className="text-gray-500 mb-6">Add items to it now.</p>
            <Link to="/products" className="bg-bv-blue text-white px-10 py-3 rounded-sm shadow hover:bg-blue-700 font-medium">Shop Now</Link>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-2 flex flex-col lg:flex-row gap-4">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white shadow-sm rounded-sm mb-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium">My Cart ({cart.length})</h2>
            </div>
            {cart.map((item) => (
              <div key={item.id} className="p-6 border-b border-gray-200 flex flex-col sm:flex-row gap-6 last:border-b-0">
                 <div className="w-24 h-24 shrink-0 mx-auto sm:mx-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                 </div>
                 <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">{item.name}</h3>
                    <div className="text-sm text-gray-500 mb-3">Seller: RetailNet <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" className="h-4 inline ml-1"/></div>
                    
                    <div className="flex items-end gap-3 mb-4">
                       <span className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString('en-IN')}</span>
                       <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                       <span className="text-xs text-green-600 font-bold">{item.discount}% Off</span>
                    </div>

                    <div className="flex items-center gap-6">
                       <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                             <Minus size={14} />
                          </button>
                          <span className="w-8 text-center border border-gray-200 py-0.5">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                             <Plus size={14} />
                          </button>
                       </div>
                       <button onClick={() => removeFromCart(item.id)} className="font-medium text-gray-800 hover:text-bv-blue text-sm uppercase flex items-center gap-1">
                          Remove
                       </button>
                    </div>
                 </div>
              </div>
            ))}
            
            <div className="p-4 flex justify-end border-t border-gray-200 sticky bottom-0 bg-white shadow-inner">
               <button className="bg-orange-600 text-white px-10 py-3 font-bold rounded-sm shadow hover:bg-orange-700 uppercase text-sm">
                  Place Order
               </button>
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div className="lg:w-1/3 h-fit">
           <div className="bg-white shadow-sm rounded-sm p-4 sticky top-20">
              <h3 className="text-gray-500 font-medium uppercase text-sm border-b pb-3 mb-4">Price Details</h3>
              
              <div className="space-y-4 text-gray-800">
                 <div className="flex justify-between">
                    <span>Price ({cart.length} items)</span>
                    <span>₹{originalTotal.toLocaleString('en-IN')}</span>
                 </div>
                 <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- ₹{discount.toLocaleString('en-IN')}</span>
                 </div>
                 <div className="flex justify-between text-green-600">
                    <span>Delivery Charges</span>
                    <span>FREE</span>
                 </div>
                 
                 <div className="flex justify-between font-bold text-lg border-t border-dashed pt-4 border-gray-300">
                    <span>Total Amount</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                 </div>
              </div>
              
              <div className="mt-4 text-green-700 font-medium text-sm">
                 You will save ₹{discount.toLocaleString('en-IN')} on this order
              </div>
           </div>
           
           <div className="mt-4 flex items-center gap-3 text-gray-500 text-xs p-4">
              <ShieldCheck className="text-gray-400" size={24}/>
              Safe and Secure Payments. Easy returns. 100% Authentic products.
           </div>
        </div>
      </div>
    </div>
  );
};