import React from 'react';
import { User, Box, CreditCard, LogOut } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6">
       <div className="container mx-auto px-2 flex flex-col md:flex-row gap-4">
          {/* Sidebar */}
          <div className="md:w-1/4">
             <div className="bg-white shadow-sm rounded-sm p-4 mb-4 flex items-center gap-4">
                <img src="https://ui-avatars.com/api/?name=User+Name&background=2874f0&color=fff" alt="User" className="w-12 h-12 rounded-full" />
                <div>
                   <div className="text-xs text-gray-500">Hello,</div>
                   <div className="font-bold text-gray-800">BV User</div>
                </div>
             </div>

             <div className="bg-white shadow-sm rounded-sm overflow-hidden">
                <div className="p-4 border-b hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-bv-blue font-medium">
                   <User size={18} /> Profile Information
                </div>
                <div className="p-4 border-b hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-gray-600">
                   <Box size={18} /> My Orders
                </div>
                <div className="p-4 border-b hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-gray-600">
                   <CreditCard size={18} /> Saved Cards
                </div>
                <div className="p-4 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-gray-600">
                   <LogOut size={18} /> Logout
                </div>
             </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white shadow-sm rounded-sm p-6">
             <h2 className="text-lg font-bold text-gray-800 mb-6">Personal Information</h2>
             
             <form className="space-y-6 max-w-lg">
                <div className="flex gap-4">
                   <div className="flex-1">
                      <label className="text-sm text-gray-600 mb-1 block">First Name</label>
                      <input type="text" value="BV" disabled className="w-full border border-gray-300 p-2 rounded-sm bg-gray-50" />
                   </div>
                   <div className="flex-1">
                      <label className="text-sm text-gray-600 mb-1 block">Last Name</label>
                      <input type="text" value="User" disabled className="w-full border border-gray-300 p-2 rounded-sm bg-gray-50" />
                   </div>
                </div>

                <div>
                    <label className="text-sm text-gray-600 mb-1 block">Gender</label>
                    <div className="flex gap-4 mt-2">
                       <label className="flex items-center gap-2"><input type="radio" checked readOnly /> Male</label>
                       <label className="flex items-center gap-2"><input type="radio" disabled /> Female</label>
                    </div>
                </div>

                <div>
                   <label className="text-sm text-gray-600 mb-1 block">Email Address</label>
                   <input type="email" value="user@bvmart.com" disabled className="w-full border border-gray-300 p-2 rounded-sm bg-gray-50" />
                </div>

                <div>
                   <label className="text-sm text-gray-600 mb-1 block">Mobile Number</label>
                   <input type="text" value="+91 98765 43210" disabled className="w-full border border-gray-300 p-2 rounded-sm bg-gray-50" />
                </div>

                <button type="button" className="text-bv-blue font-medium text-sm hover:underline">Edit Information</button>
             </form>

             <div className="mt-10 pt-6 border-t">
                <h3 className="font-bold text-gray-800 mb-4">FAQs</h3>
                <div className="space-y-3 text-sm">
                   <div>
                      <h4 className="font-medium">What happens when I update my email address (or mobile number)?</h4>
                      <p className="text-gray-500">Your login email id (or mobile number) changes, likewise. You'll receive all the communications on your new email address (or mobile number).</p>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};
