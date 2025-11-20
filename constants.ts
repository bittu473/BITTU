import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'electronics', name: 'Electronics', image: 'https://picsum.photos/seed/electronics/200/200' },
  { id: 'fashion', name: 'Fashion', image: 'https://picsum.photos/seed/fashion/200/200' },
  { id: 'home', name: 'Home & Furniture', image: 'https://picsum.photos/seed/home/200/200' },
  { id: 'grocery', name: 'Grocery', image: 'https://picsum.photos/seed/grocery/200/200' },
  { id: 'toys', name: 'Toys & Beauty', image: 'https://picsum.photos/seed/toys/200/200' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'BV Pro X1 Smartphone',
    description: 'The ultimate smartphone experience with 108MP Camera and 5000mAh battery.',
    price: 15999,
    originalPrice: 24999,
    discount: 36,
    rating: 4.5,
    reviews: 1240,
    image: 'https://picsum.photos/seed/phone1/400/400',
    category: 'electronics',
    tags: ['smartphone', 'mobile', 'android'],
    features: ['8GB RAM', '128GB Storage', 'Snapdragon 870', 'AMOLED Display']
  },
  {
    id: '2',
    name: 'Urban Cool Men\'s Jacket',
    description: 'Stylish bomber jacket for winter. Water resistant and warm.',
    price: 1499,
    originalPrice: 3999,
    discount: 62,
    rating: 4.2,
    reviews: 450,
    image: 'https://picsum.photos/seed/jacket1/400/400',
    category: 'fashion',
    tags: ['clothing', 'winter', 'men'],
    features: ['Polyester', 'Zipper Closure', 'Machine Wash']
  },
  {
    id: '3',
    name: 'Smart LED TV 43 Inch',
    description: '4K Ultra HD Smart LED TV with Dolby Atmos sound.',
    price: 21999,
    originalPrice: 40000,
    discount: 45,
    rating: 4.7,
    reviews: 3200,
    image: 'https://picsum.photos/seed/tv1/400/400',
    category: 'electronics',
    tags: ['tv', 'smart tv', 'led'],
    features: ['4K HDR', 'Android TV', '3 HDMI Ports']
  },
  {
    id: '4',
    name: 'Organic Almonds 1kg',
    description: 'Premium quality California almonds.',
    price: 850,
    originalPrice: 1200,
    discount: 29,
    rating: 4.8,
    reviews: 500,
    image: 'https://picsum.photos/seed/almonds/400/400',
    category: 'grocery',
    tags: ['food', 'dry fruits', 'healthy'],
    features: ['100% Natural', 'High Protein', 'Gluten Free']
  },
  {
    id: '5',
    name: 'Gaming Laptop Z5',
    description: 'High performance gaming laptop with RTX 3060.',
    price: 85990,
    originalPrice: 110000,
    discount: 21,
    rating: 4.6,
    reviews: 890,
    image: 'https://picsum.photos/seed/laptop/400/400',
    category: 'electronics',
    tags: ['computer', 'gaming', 'laptop'],
    features: ['16GB RAM', '512GB SSD', '144Hz Screen']
  },
  {
    id: '6',
    name: 'Women\'s Running Shoes',
    description: 'Lightweight and comfortable running shoes.',
    price: 1299,
    originalPrice: 2999,
    discount: 56,
    rating: 4.3,
    reviews: 210,
    image: 'https://picsum.photos/seed/shoes/400/400',
    category: 'fashion',
    tags: ['shoes', 'sports', 'women'],
    features: ['Breathable Mesh', 'EVA Sole', 'Lightweight']
  },
  {
    id: '7',
    name: 'Modern Sofa Set',
    description: '3-seater fabric sofa set in grey color.',
    price: 18999,
    originalPrice: 35000,
    discount: 45,
    rating: 4.1,
    reviews: 120,
    image: 'https://picsum.photos/seed/sofa/400/400',
    category: 'home',
    tags: ['furniture', 'living room'],
    features: ['Wooden Frame', 'High Density Foam', '1 Year Warranty']
  },
  {
    id: '8',
    name: 'Wireless Earbuds Pro',
    description: 'Active Noise Cancelling wireless earbuds.',
    price: 2499,
    originalPrice: 5999,
    discount: 58,
    rating: 4.4,
    reviews: 3400,
    image: 'https://picsum.photos/seed/earbuds/400/400',
    category: 'electronics',
    tags: ['audio', 'wireless', 'bluetooth'],
    features: ['ANC', '24h Battery', 'Touch Controls']
  }
];
