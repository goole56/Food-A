export type Role = 'customer' | 'admin';

export type Language = 'en' | 'es' | 'bn';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  language?: Language;
  phone?: string;
}

export interface Food {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  ingredients?: string[];
  allergens?: string[];
  dietary?: string[];
}

export interface CartItem {
  food: Food;
  quantity: number;
}

export type OrderStatus = 'pending' | 'preparing' | 'on_the_way' | 'delivered';

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface SupportMessage {
  id: string;
  customerId: string;
  text: string;
  sender: 'customer' | 'admin' | 'system';
  timestamp: string;
}

