import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../lib/i18n';
import { motion } from 'motion/react';
import { 
  UserCircle, 
  MapPin, 
  CreditCard, 
  Ticket, 
  HelpCircle, 
  Settings, 
  LogOut, 
  Trash2,
  ChevronRight,
  ShoppingBag,
  Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CustomerProfile() {
  const { user, logout } = useAuth();
  const t = useTranslation(user?.language);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
      // Simulate account deletion
      logout();
      navigate('/login');
    }
  };

  const menuItems = [
    { icon: <ShoppingBag size={20} />, label: 'My Orders', description: 'View active and past order history', action: () => navigate('/customer') },
    { icon: <MapPin size={20} />, label: 'Saved Addresses', description: 'Manage home, work, and custom locations', action: () => navigate('/customer/addresses') },
    { icon: <CreditCard size={20} />, label: 'Payment Methods', description: 'Manage cards, bKash, and digital wallets', action: () => {} },
    { icon: <Ticket size={20} />, label: 'Vouchers & Offers', description: 'View available promo codes and rewards', action: () => {} },
    { icon: <HelpCircle size={20} />, label: 'Help Center / Support', description: 'Live chat and customer care', action: () => navigate('/customer/support') },
    { icon: <Settings size={20} />, label: 'Settings', description: 'App preferences, language, notifications', action: () => {} },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 md:pb-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-brand-card rounded-2xl p-6 border border-brand-border shadow-sm mb-6 flex items-center gap-5 relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-brand-pink/10 border-2 border-brand-pink flex items-center justify-center overflow-hidden shrink-0">
            {user?.email.includes('google') || user?.email.includes('facebook') ? (
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <UserCircle size={40} className="text-brand-pink" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-black text-brand-text mb-1">{user?.name || 'Customer User'}</h2>
            <p className="text-sm text-brand-text-muted font-medium mb-1">{user?.email}</p>
            {user?.phone && <p className="text-sm text-brand-text-muted font-medium">{user?.phone}</p>}
          </div>
          <div className="absolute top-4 right-4 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1 border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Verified
          </div>
        </div>

        <div className="bg-brand-card rounded-2xl border border-brand-border shadow-sm overflow-hidden mb-6">
          <div className="divide-y divide-brand-border">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center justify-between p-4 hover:bg-brand-bg transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center text-brand-text-muted group-hover:text-brand-pink group-hover:bg-brand-pink/10 transition-colors">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-brand-text">{item.label}</h3>
                    <p className="text-xs text-brand-text-muted">{item.description}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-brand-text-muted group-hover:text-brand-pink transition-colors" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-red-200 bg-red-50 text-red-600 font-bold hover:bg-red-100 hover:border-red-300 transition-colors"
          >
            <LogOut size={20} />
            Log Out
          </button>
          
          <button
            onClick={handleDeleteAccount}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl text-brand-text-muted font-bold hover:text-red-500 transition-colors text-sm"
          >
            <Trash2 size={18} />
            Delete Account
          </button>
        </div>
      </motion.div>
    </div>
  );
}

