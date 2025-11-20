export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  tags: string[];
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  phone: string;
}

export type Category = {
  id: string;
  name: string;
  image: string;
};

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
