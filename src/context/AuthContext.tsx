import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Language } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, role: 'customer' | 'admin') => void;
  logout: () => void;
  updateProfile: (name: string, phone: string, language: Language) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('food_app_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('food_app_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('food_app_user');
    }
  }, [user]);

  const login = (email: string, role: 'customer' | 'admin') => {
    const isAtik = email.toLowerCase() === 'atik@admin.com';
    setUser({
      id: Math.random().toString(36).substring(7),
      email,
      name: isAtik ? 'ATIK ULLAH' : email.split('@')[0],
      role: isAtik ? 'admin' : role, // Enforce ATIK ULLAH as admin if using special email
      language: 'en',
      phone: '',
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (name: string, phone: string, language: Language) => {
    if (user) {
      setUser({ ...user, name, phone, language });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

