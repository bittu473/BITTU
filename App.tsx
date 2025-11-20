import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { AIAssistant } from './components/AIAssistant';
import { Home } from './pages/Home';
import { ProductList } from './pages/ProductList';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Dashboard } from './pages/Dashboard';
import { AdminPanel } from './pages/AdminPanel';
import { CartItem, Product } from './types';
import { PRODUCTS as INITIAL_PRODUCTS } from './constants';

// --- Context Setup ---
interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  total: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within ShopProvider");
  return context;
};

// Backward compatibility for existing components expecting useCart
export const useCart = useShop;

// --- Footer Component ---
const Footer: React.FC = () => (
  <footer className="bg-bv-dark text-white pt-10 pb-6 text-xs border-t-4 border-bv-yellow">
    <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
       <div>
          <h4 className="text-gray-400 mb-3 uppercase font-medium tracking-wide">About</h4>
          <ul className="space-y-2">
             <li><a href="#" className="hover:underline">Contact Us</a></li>
             <li><a href="#" className="hover:underline">About Us</a></li>
             <li><a href="#" className="hover:underline">Careers</a></li>
             <li><a href="#" className="hover:underline">Press</a></li>
          </ul>
       </div>
       <div>
          <h4 className="text-gray-400 mb-3 uppercase font-medium tracking-wide">Help</h4>
          <ul className="space-y-2">
             <li><a href="#" className="hover:underline">Payments</a></li>
             <li><a href="#" className="hover:underline">Shipping</a></li>
             <li><a href="#" className="hover:underline">Cancellation</a></li>
             <li><a href="#" className="hover:underline">FAQ</a></li>
          </ul>
       </div>
       <div>
          <h4 className="text-gray-400 mb-3 uppercase font-medium tracking-wide">Policy</h4>
          <ul className="space-y-2">
             <li><a href="#" className="hover:underline">Return Policy</a></li>
             <li><a href="#" className="hover:underline">Terms of Use</a></li>
             <li><a href="#" className="hover:underline">Security</a></li>
             <li><a href="#" className="hover:underline">Privacy</a></li>
          </ul>
       </div>
       <div>
          <h4 className="text-gray-400 mb-3 uppercase font-medium tracking-wide">Social</h4>
          <div className="flex gap-3">
             <span className="w-6 h-6 bg-gray-600 rounded-full"></span>
             <span className="w-6 h-6 bg-gray-600 rounded-full"></span>
             <span className="w-6 h-6 bg-gray-600 rounded-full"></span>
          </div>
          <p className="mt-4 text-gray-500">© 2024 BV Mart India</p>
       </div>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// --- Main App ---
export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Cart Functions
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, quantity: qty } : p));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Product Management Functions
  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    // Also remove from cart if present
    setCart(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ShopContext.Provider value={{ 
      products, 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      addProduct,
      updateProduct,
      deleteProduct,
      total 
    }}>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col font-sans text-gray-800">
          <Header />
          
          <div className="flex-grow relative">
             <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/search" element={<ProductList />} />
             </Routes>
          </div>

          <Footer />
          
          {/* AI Assistant */}
          <AIAssistant />
        </div>
      </HashRouter>
    </ShopContext.Provider>
  );
}