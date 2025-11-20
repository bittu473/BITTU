import React, { useState } from 'react';
import { useShop } from '../App';
import { Product, Category } from '../types';
import { CATEGORIES } from '../constants';
import { Plus, Pencil, Trash2, X, Save, Search, LayoutDashboard, Package } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useShop();
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Initial empty state for form
  const initialFormState: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    discount: 0,
    rating: 0,
    reviews: 0,
    image: 'https://picsum.photos/seed/new/400/400',
    category: 'electronics',
    tags: [],
    features: []
  };

  const [formData, setFormData] = useState<Product>(initialFormState);

  const handleEdit = (product: Product) => {
    setFormData(product);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setFormData({
      ...initialFormState,
      id: Date.now().toString(), // Simple ID generation
      rating: 4.5,
      reviews: 0
    });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate discount automatically if not set manually
    const calculatedDiscount = formData.originalPrice > formData.price 
      ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100) 
      : 0;
      
    const productToSave = {
      ...formData,
      discount: calculatedDiscount
    };

    const exists = products.find(p => p.id === formData.id);
    if (exists) {
      updateProduct(productToSave);
    } else {
      addProduct(productToSave);
    }
    
    setIsEditing(false);
  };

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const features = e.target.value.split(',').map(f => f.trim()).filter(f => f !== '');
    setFormData({ ...formData, features });
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      <div className="bg-bv-dark text-white py-6 shadow-md">
        <div className="container mx-auto px-4 flex items-center gap-3">
          <LayoutDashboard size={28} className="text-bv-yellow" />
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Stats Sidebar */}
        <div className="lg:w-1/4 space-y-4">
          <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-bv-blue">
            <div className="text-gray-500 text-sm font-medium uppercase">Total Products</div>
            <div className="text-3xl font-bold text-gray-800 mt-1">{products.length}</div>
          </div>
          <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-green-500">
            <div className="text-gray-500 text-sm font-medium uppercase">Total Inventory Value</div>
            <div className="text-3xl font-bold text-gray-800 mt-1">
              ₹{products.reduce((acc, p) => acc + p.price, 0).toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-sm shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-64">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-bv-blue"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              <button 
                onClick={handleAddNew}
                className="bg-bv-blue text-white px-4 py-2 rounded-sm font-medium hover:bg-blue-700 flex items-center gap-2 transition"
              >
                <Plus size={18} /> Add Product
              </button>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 uppercase border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 shrink-0 bg-gray-100 rounded overflow-hidden">
                            <img src={product.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-gray-500 text-xs">ID: {product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        ₹{product.price.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-900 transition">
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900 transition">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No products found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal Overlay */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {products.find(p => p.id === formData.id) ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-bv-blue focus:border-bv-blue"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input 
                    required
                    type="number" 
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                    className="w-full p-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-bv-blue focus:border-bv-blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                  <input 
                    required
                    type="number" 
                    value={formData.originalPrice} 
                    onChange={e => setFormData({...formData, originalPrice: Number(e.target.value)})}
                    className="w-full p-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-bv-blue focus:border-bv-blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-bv-blue focus:border-bv-blue capitalize"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input 
                    type="text" 
                    value={formData.image} 
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-bv-blue focus:border-bv-blue"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    rows={3}
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-bv-blue focus:border-bv-blue"
                  ></textarea>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                  <input 
                    type="text" 
                    value={formData.features.join(', ')} 
                    onChange={handleFeatureChange}
                    placeholder="e.g. 8GB RAM, 128GB Storage, 5G Ready"
                    className="w-full p-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-bv-blue focus:border-bv-blue"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-sm transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-bv-blue text-white font-medium rounded-sm hover:bg-blue-700 shadow-sm transition flex items-center gap-2"
                >
                  <Save size={18} /> Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};