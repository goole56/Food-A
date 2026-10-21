import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Order, CartItem, Food } from '../types';

interface StoreContextType {
  cart: CartItem[];
  addToCart: (food: Food) => void;
  removeFromCart: (foodId: string) => void;
  clearCart: () => void;
  reorder: (items: CartItem[]) => void;
  orders: Order[];
  placeOrder: (customerId: string, customerName: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('food_app_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('food_app_orders', JSON.stringify(orders));
  }, [orders]);

  // Performance optimization: Memoize callback handlers using state functional updaters
  // to maintain stable function references and avoid unnecessary re-renders in consumer components.
  const addToCart = useCallback((food: Food) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.food.id === food.id);
      if (existing) {
        return prev.map((item) =>
          item.food.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { food, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((foodId: string) => {
    setCart((prev) => prev.filter((item) => item.food.id !== foodId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const reorder = useCallback((items: CartItem[]) => {
    setCart(items);
  }, []);

  const placeOrder = useCallback((customerId: string, customerName: string) => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.food.price * item.quantity, 0);
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerId,
      customerName,
      items: cart,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
  }, [cart]);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  }, []);

  // Performance optimization: Memoize context value to ensure consumers only re-render
  // when state (cart or orders) actually changes, preventing re-renders from context value object allocation.
  const value = useMemo(
    () => ({ cart, addToCart, removeFromCart, clearCart, reorder, orders, placeOrder, updateOrderStatus }),
    [cart, orders, addToCart, removeFromCart, clearCart, reorder, placeOrder, updateOrderStatus]
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
