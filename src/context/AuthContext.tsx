import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
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

  // Performance Optimization: Wrap action handlers in useCallback to maintain stable function references.
  const login = useCallback((email: string, role: 'customer' | 'admin') => {
    const isAtik = email.toLowerCase() === 'atik@admin.com';
    setUser({
      id: Math.random().toString(36).substring(7),
      email,
      name: isAtik ? 'ATIK ULLAH' : email.split('@')[0],
      role: isAtik ? 'admin' : role, // Enforce ATIK ULLAH as admin if using special email
      language: 'en',
      phone: '',
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback((name: string, phone: string, language: Language) => {
    setUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, name, phone, language };
      }
      return prevUser;
    });
  }, []);

  // Performance Optimization: Memoize context value object to prevent re-rendering all subscribed components
  // when parent components re-render.
  const value = useMemo(
    () => ({ user, login, logout, updateProfile }),
    [user, login, logout, updateProfile]
  );

  return (
    <AuthContext.Provider value={value}>
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
