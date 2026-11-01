import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { useTranslation } from '../lib/i18n';
import { LogOut, ShoppingBag, Home, LayoutDashboard, UserCircle, ChefHat, MessageSquare, MapPin, ChevronDown, Heart, Search, FileText } from 'lucide-react';
import { Button3D } from './ui/Button3D';

export function Layout() {
  const { user, logout } = useAuth();
  const { cart } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslation(user?.language);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-pink/30 overflow-hidden relative flex flex-col pb-16 sm:pb-0">
      
      {/* Navbar */}
      <nav className="relative z-50 bg-white border-b border-brand-border sticky top-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 sm:h-20 items-center">
            
            {/* Left side: Brand (Desktop) & Location */}
            <div className="flex items-center gap-4 sm:gap-8">
              <div 
                role="button"
                tabIndex={0}
                aria-label="foodpanda home"
                className="hidden sm:flex items-center gap-2 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink rounded-lg p-1"
                onClick={() => navigate('/')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate('/');
                  }
                }}
              >
                <div className="p-1.5 bg-brand-pink rounded-lg shadow-sm group-hover:scale-105 transition-transform">
                  <ChefHat size={24} className="text-white drop-shadow-sm" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl font-black text-brand-pink tracking-tight leading-none">foodpanda</h1>
                </div>
              </div>

              {/* Location Selector */}
              {user?.role === 'customer' && (
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Change delivery address: 123 Premium Street, NY"
                  className="flex items-center gap-1.5 cursor-pointer hover:bg-brand-card py-1.5 px-2 -ml-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
                >
                  <MapPin size={20} className="text-brand-pink" />
                  <div className="flex flex-col max-w-[150px] sm:max-w-[200px]">
                    <span className="text-[10px] font-bold text-brand-pink uppercase tracking-wider">Delivering to</span>
                    <span className="text-sm font-bold text-brand-text truncate">123 Premium Street, NY</span>
                  </div>
                  <ChevronDown size={16} className="text-brand-pink ml-1" />
                </div>
              )}
            </div>

            {/* Right side Actions */}
            <div className="flex items-center gap-3 sm:gap-6">
              {user ? (
                <>
                  {user.role === 'customer' && (
                    <>
                      <button
                        aria-label="Favorites"
                        title="Favorites"
                        className="p-2 text-brand-text hover:text-brand-pink transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink rounded-lg"
                      >
                        <Heart size={24} />
                      </button>
                      
                      <button 
                        onClick={() => navigate('/customer/cart')}
                        aria-label={totalItems > 0 ? `Shopping cart, ${totalItems} item${totalItems === 1 ? '' : 's'}` : 'Shopping cart'}
                        title="Shopping cart"
                        className="p-2 text-brand-text hover:text-brand-pink transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink rounded-lg"
                      >
                        <ShoppingBag size={24} />
                        {totalItems > 0 && (
                          <span
                            aria-hidden="true"
                            className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-pink text-[10px] font-bold text-white shadow-sm"
                          >
                            {totalItems}
                          </span>
                        )}
                      </button>

                      {/* Desktop specific extra nav items */}
                      <div className="hidden sm:flex items-center gap-4 border-l border-brand-border pl-6 ml-2">
                        <button 
                          onClick={() => navigate('/customer/orders')}
                          className="flex items-center gap-2 text-brand-text font-semibold hover:text-brand-pink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink rounded-lg px-2 py-1"
                        >
                          <FileText size={20} /> Orders
                        </button>
                        <button 
                          onClick={() => navigate('/customer/profile')}
                          className="flex items-center gap-2 text-brand-text font-semibold hover:text-brand-pink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink rounded-lg px-2 py-1"
                        >
                          <UserCircle size={20} /> Profile
                        </button>
                      </div>
                    </>
                  )}

                  {user.role === 'admin' && (
                    <>
                      <div className="flex items-center gap-2 px-4 py-2 bg-brand-card rounded-full border border-brand-border mr-2">
                        <UserCircle size={20} className="text-brand-text-muted" />
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs px-2 py-0.5 bg-brand-pink/10 text-brand-pink rounded-full ml-2 uppercase font-bold">Admin</span>
                      </div>
                      <button 
                        onClick={() => navigate('/admin')}
                        aria-label="Admin Dashboard"
                        title="Admin Dashboard"
                        className="p-2 text-brand-text hover:text-brand-pink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink rounded-lg"
                      >
                        <LayoutDashboard size={24} />
                      </button>
                      <button 
                        onClick={handleLogout}
                        aria-label="Log Out"
                        title="Log Out"
                        className="p-2 text-brand-text-muted hover:text-red-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg"
                      >
                        <LogOut size={24} />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="flex gap-3">
                  <Button3D variant="outline" size="sm" onClick={() => navigate('/login')}>Login</Button3D>
                  <Button3D variant="primary" size="sm" onClick={() => navigate('/register')}>Register</Button3D>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 relative z-10 p-0 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto h-full pb-20 sm:pb-0">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation (Customer) */}
      {user && user.role === 'customer' && (
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-brand-border flex justify-around items-center p-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => navigate('/customer')}
            className={`p-2 flex flex-col items-center gap-1 ${location.pathname === '/customer' ? 'text-brand-pink' : 'text-brand-text-muted'}`}
          >
            <Home size={24} className={location.pathname === '/customer' ? 'fill-current' : ''} />
            <span className="text-[10px] font-bold">Home</span>
          </button>
          
          <button 
            onClick={() => navigate('/customer/search')}
            className={`p-2 flex flex-col items-center gap-1 ${location.pathname === '/customer/search' ? 'text-brand-pink' : 'text-brand-text-muted'}`}
          >
            <Search size={24} />
            <span className="text-[10px] font-bold">Search</span>
          </button>

          <button 
            onClick={() => navigate('/customer/orders')}
            className={`p-2 flex flex-col items-center gap-1 ${location.pathname === '/customer/orders' ? 'text-brand-pink' : 'text-brand-text-muted'}`}
          >
            <FileText size={24} className={location.pathname === '/customer/orders' ? 'fill-current' : ''} />
            <span className="text-[10px] font-bold">Orders</span>
          </button>

          <button 
            onClick={() => navigate('/customer/profile')}
            className={`p-2 flex flex-col items-center gap-1 ${location.pathname === '/customer/profile' ? 'text-brand-pink' : 'text-brand-text-muted'}`}
          >
            <UserCircle size={24} className={location.pathname === '/customer/profile' ? 'fill-current' : ''} />
            <span className="text-[10px] font-bold">Profile</span>
          </button>
        </nav>
      )}

      {/* Mobile Bottom Navigation (Admin) */}
      {user && user.role === 'admin' && (
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-brand-border flex justify-around items-center p-3 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => navigate('/admin')}
            className={`p-2 flex flex-col items-center gap-1 ${location.pathname === '/admin' ? 'text-brand-pink' : 'text-brand-text-muted'}`}
          >
            <LayoutDashboard size={22} />
            <span className="text-[10px] font-bold">{t('admin')}</span>
          </button>
          <button 
            onClick={handleLogout}
            className="p-2 flex flex-col items-center gap-1 text-red-500"
          >
            <LogOut size={22} />
            <span className="text-[10px] font-bold">{t('logout')}</span>
          </button>
        </nav>
      )}
    </div>
  );
}

