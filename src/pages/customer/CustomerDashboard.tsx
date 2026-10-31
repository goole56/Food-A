import React, { useState, Suspense, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { useTranslation } from '../../lib/i18n';
import { mockFoods } from '../../lib/data';
import { Food } from '../../types';
import { Card3D } from '../../components/ui/Card3D';
import { Button3D } from '../../components/ui/Button3D';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Plus, Minus, Trash2, Clock, CheckCircle2, ChevronRight, UtensilsCrossed, Info, X, Star, ShoppingBag, Package, Search, Ticket, MapPin, Phone, MessageSquare, RefreshCcw, FileText } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';
import { CustomerProfile } from './CustomerProfile';
import { CustomerSupport } from './CustomerSupport';
import { CustomerAddresses } from './CustomerAddresses';

const PROMO_BANNERS = [
  { id: 1, title: '50% OFF on First Order', code: 'WELCOME50', color: 'from-pink-500 to-rose-500' },
  { id: 2, title: 'Free Delivery Weekend', code: 'FREEDEL', color: 'from-orange-400 to-red-500' },
  { id: 3, title: '20% Cashback', code: 'CASHBACK', color: 'from-purple-500 to-indigo-500' },
];

const FILTERS = ['Offers', 'Free Delivery', 'Top Rated', 'Fastest', 'Ratings 4.0+'];
const CUISINES = [
  { name: 'Burgers', icon: '🍔' },
  { name: 'Biryani', icon: '🥘' },
  { name: 'Pizza', icon: '🍕' },
  { name: 'Asian', icon: '🍜' },
  { name: 'Desserts', icon: '🍰' },
];

// Mocking Restaurants from mockFoods
const MOCK_RESTAURANTS = mockFoods.map(food => ({
  id: food.id,
  name: `${food.name} Express`,
  image: food.image,
  rating: 4.5 + Math.random() * 0.4,
  reviews: Math.floor(Math.random() * 1000) + 100,
  deliveryTime: '20-30 min',
  deliveryFee: 25,
  tags: ['$$', 'Fast Food', food.name.split(' ')[0]],
  offer: Math.random() > 0.5 ? '20% OFF' : null,
  foodRef: food
}));

function FoodMenu() {
  const { addToCart } = useStore();
  const { user } = useAuth();
  const t = useTranslation(user?.language);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  return (
    <div className="space-y-6">
      {/* B. Main Service Selection Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="col-span-2 bg-brand-card rounded-2xl p-4 border border-brand-border shadow-sm cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="relative z-10 w-2/3">
            <h2 className="text-2xl font-black text-brand-text mb-1 group-hover:text-brand-pink transition-colors">Food Delivery</h2>
            <p className="text-sm text-brand-text-muted">Order food you love</p>
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-brand-pink/10 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
             <UtensilsCrossed size={48} className="text-brand-pink opacity-80" />
          </div>
        </div>
        
        <div className="bg-brand-card rounded-2xl p-4 border border-brand-border shadow-sm cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-brand-text mb-1 group-hover:text-brand-pink transition-colors">pandamart</h3>
            <span className="inline-block px-2 py-0.5 bg-brand-pink/10 text-brand-pink text-[10px] font-bold rounded-md">20 min</span>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
             <ShoppingBag size={40} className="text-purple-500 opacity-80" />
          </div>
        </div>

        <div className="grid grid-rows-2 gap-3 sm:gap-4">
          <div className="bg-brand-card rounded-2xl p-4 border border-brand-border shadow-sm cursor-pointer hover:shadow-md transition-shadow flex items-center justify-between group">
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-brand-text group-hover:text-brand-pink transition-colors">Shops</h3>
              <p className="text-[10px] text-brand-text-muted">Groceries & more</p>
            </div>
          </div>
          <div className="bg-brand-card rounded-2xl p-4 border border-brand-border shadow-sm cursor-pointer hover:shadow-md transition-shadow flex items-center justify-between group">
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-brand-text group-hover:text-brand-pink transition-colors">pandago</h3>
              <p className="text-[10px] text-brand-text-muted">Send parcels</p>
            </div>
            <Package size={24} className="text-brand-pink opacity-80" />
          </div>
        </div>
      </div>

      {/* C. Promotional Carousel */}
      <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        {PROMO_BANNERS.map((promo) => (
          <div key={promo.id} className={`flex-shrink-0 w-72 h-32 rounded-2xl bg-gradient-to-r ${promo.color} p-4 text-white flex flex-col justify-center relative overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-transform`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-10 -mt-10 blur-xl"></div>
            <h4 className="text-lg font-black leading-tight mb-2 relative z-10 max-w-[70%]">{promo.title}</h4>
            <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-bold w-max relative z-10">
              {promo.code}
            </div>
          </div>
        ))}
      </div>

      {/* D. Quick Filters */}
      <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        {FILTERS.map((filter, i) => (
          <button key={i} className="flex-shrink-0 px-4 py-1.5 bg-brand-bg border border-brand-border rounded-full text-sm font-medium text-brand-text whitespace-nowrap hover:bg-brand-card hover:border-brand-text-muted transition-colors">
            {filter}
          </button>
        ))}
      </div>

      {/* D. Cuisine Categories */}
      <div className="flex justify-between overflow-x-auto gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        {CUISINES.map((cuisine, i) => (
          <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-brand-card border border-brand-border flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-sm">
              {cuisine.icon}
            </div>
            <span className="text-xs font-medium text-brand-text group-hover:text-brand-pink transition-colors">{cuisine.name}</span>
          </div>
        ))}
      </div>

      {/* D. Dynamic Feed Cards (Popular Nearby) */}
      <div>
        <h3 className="text-xl font-bold text-brand-text mb-4">Popular Nearby</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_RESTAURANTS.map((restaurant, idx) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div 
                className="group flex flex-col h-full cursor-pointer"
                onClick={() => setSelectedFood(restaurant.foodRef)}
              >
                {/* E. Restaurant Listing Card */}
                <div className="relative h-48 w-full overflow-hidden rounded-2xl mb-3 shadow-sm border border-brand-border">
                  <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Tags Overlay */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {restaurant.offer && (
                      <span className="bg-brand-pink text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                        {restaurant.offer}
                      </span>
                    )}
                    <span className="bg-brand-pink text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                      Free Delivery
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-brand-text text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                    {restaurant.deliveryTime}
                  </div>
                </div>
                
                {/* Text Info Stack */}
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-brand-text text-lg group-hover:text-brand-pink transition-colors truncate pr-2">{restaurant.name}</h4>
                  <div className="flex items-center gap-1 bg-brand-card px-1.5 py-0.5 rounded-md flex-shrink-0">
                    <Star size={12} className="text-brand-pink fill-current" />
                    <span className="text-xs font-bold text-brand-text">{restaurant.rating.toFixed(1)}</span>
                    <span className="text-[10px] text-brand-text-muted">({restaurant.reviews})</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-brand-text-muted">
                  <span>৳{restaurant.deliveryFee} delivery fee</span>
                  <span>•</span>
                  <span>{restaurant.tags.join(' • ')}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for Food Details (Kept for ordering functionality) */}
      <AnimatePresence>
        {selectedFood && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pb-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFood(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-brand-bg rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="relative h-64 w-full">
                <img src={selectedFood.image} alt={selectedFood.name} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedFood(null)}
                  className="absolute top-4 right-4 p-2 text-brand-text bg-white/80 backdrop-blur-md rounded-full shadow-md hover:bg-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                <h3 className="text-2xl font-black text-brand-text mb-2">{selectedFood.name}</h3>
                <p className="text-brand-text-muted mb-6 leading-relaxed">{selectedFood.description}</p>
                
                <div className="space-y-6">
                  {selectedFood.ingredients && selectedFood.ingredients.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold text-brand-text mb-2">Ingredients</h4>
                      <div className="flex flex-wrap gap-2">
                         {selectedFood.ingredients.map((ing, i) => (
                           <span key={i} className="px-3 py-1 bg-brand-card border border-brand-border text-brand-text text-sm rounded-full">
                             {ing}
                           </span>
                         ))}
                      </div>
                    </div>
                  )}

                  {/* Add-ons and Special Instructions */}
                  <div>
                    <h4 className="text-lg font-bold text-brand-text mb-3">Add-ons</h4>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between p-3 rounded-xl border border-brand-border bg-brand-card cursor-pointer hover:border-brand-pink transition-colors">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" className="w-5 h-5 rounded text-brand-pink focus:ring-brand-pink border-brand-text-muted" />
                          <span className="text-sm font-medium text-brand-text">Extra Cheese</span>
                        </div>
                        <span className="text-sm font-bold text-brand-text">+$1.50</span>
                      </label>
                      <label className="flex items-center justify-between p-3 rounded-xl border border-brand-border bg-brand-card cursor-pointer hover:border-brand-pink transition-colors">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" className="w-5 h-5 rounded text-brand-pink focus:ring-brand-pink border-brand-text-muted" />
                          <span className="text-sm font-medium text-brand-text">Extra Sauce</span>
                        </div>
                        <span className="text-sm font-bold text-brand-text">+$0.50</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-brand-text mb-2">Special Instructions</h4>
                    <textarea 
                      placeholder="e.g. No mayo, extra spicy..." 
                      className="w-full p-3 rounded-xl bg-brand-card border border-brand-border focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink text-brand-text text-sm resize-none outline-none transition-all"
                      rows={3}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-white border-t border-brand-border flex items-center justify-between gap-4">
                 <div className="font-black text-2xl text-brand-text">
                   ${selectedFood.price.toFixed(2)}
                 </div>
                 <Button3D onClick={() => {
                   addToCart(selectedFood);
                   setSelectedFood(null);
                 }} className="flex-1">
                   <Plus size={18} /> {t('addToCart')}
                 </Button3D>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SearchPage() {
  const [query, setQuery] = useState('');
  
  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-brand-bg pt-2 pb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-muted" size={20} />
          <input 
            type="text" 
            placeholder="Search for restaurants and food"
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-brand-border bg-brand-card focus:outline-none focus:ring-2 focus:ring-brand-pink/50 text-brand-text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="text-center text-brand-text-muted mt-10">
        <Search size={48} className="mx-auto mb-4 opacity-20" />
        <p>Find your favorite cravings</p>
      </div>
    </div>
  );
}

const AVAILABLE_VOUCHERS = [
  { code: 'NEWFOOD', type: 'WELCOME', title: '50% off First Order', discountType: 'percentage', discountValue: 50, maxDiscount: 10, minOrderValue: 0 },
  { code: 'FOOD100', type: 'PLATFORM', title: '$5 off on $15', discountType: 'flat', discountValue: 5, minOrderValue: 15 },
  { code: 'PROFREE', type: 'PANDAPRO', title: 'Free Delivery', discountType: 'free_delivery', discountValue: 0, minOrderValue: 12 },
  { code: 'BKASH15', type: 'BANK', title: '15% bKash Discount', discountType: 'percentage', discountValue: 15, maxDiscount: 5, minOrderValue: 10, paymentMethod: 'mfs_bkash' },
];

function Cart() {
  const { cart, removeFromCart, addToCart, placeOrder, clearCart } = useStore();
  const { user } = useAuth();
  const t = useTranslation(user?.language);
  const navigate = useNavigate();
  const [ordering, setOrdering] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [useWallet, setUseWallet] = useState(false);
  const walletBalance = 15.00; // Mock pandaPay balance

  const [promoCode, setPromoCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<typeof AVAILABLE_VOUCHERS[0] | null>(null);
  const [voucherError, setVoucherError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.food.price * item.quantity, 0);
  const platformFee = 0.50;
  
  // Automated Cart Discount: Tiered Spend (e.g. Spend $20 get $3 off automatically)
  const autoDiscount = subtotal >= 20 ? 3.00 : 0;
  
  // Evaluate Voucher Validity based on Subtotal and Payment Method
  let isVoucherValid = false;
  let voucherDiscount = 0;
  let deliveryFee = 2.50;

  if (appliedVoucher) {
    if (subtotal < appliedVoucher.minOrderValue) {
      // Not enough subtotal
      isVoucherValid = false;
    } else if (appliedVoucher.paymentMethod && appliedVoucher.paymentMethod !== paymentMethod) {
      // Payment method mismatch
      isVoucherValid = false;
    } else {
      isVoucherValid = true;
      if (appliedVoucher.discountType === 'free_delivery') {
        deliveryFee = 0;
      } else if (appliedVoucher.discountType === 'flat') {
        voucherDiscount = appliedVoucher.discountValue;
      } else if (appliedVoucher.discountType === 'percentage') {
        voucherDiscount = (subtotal * appliedVoucher.discountValue) / 100;
        if (appliedVoucher.maxDiscount && voucherDiscount > appliedVoucher.maxDiscount) {
          voucherDiscount = appliedVoucher.maxDiscount;
        }
      }
    }
  }

  const total = subtotal + platformFee + deliveryFee - autoDiscount - (isVoucherValid ? voucherDiscount : 0);
  const finalTotal = useWallet ? Math.max(0, total - walletBalance) : Math.max(0, total);

  // Validate Promo Code Input
  const handleApplyPromo = () => {
    setVoucherError('');
    if (!promoCode.trim()) return;
    
    const voucher = AVAILABLE_VOUCHERS.find(v => v.code === promoCode.toUpperCase());
    
    if (!voucher) {
      setVoucherError('Invalid promo code');
      return;
    }
    if (subtotal < voucher.minOrderValue) {
      setVoucherError(`Minimum order value of $${voucher.minOrderValue} required`);
      return;
    }
    if (voucher.paymentMethod && voucher.paymentMethod !== paymentMethod) {
       setVoucherError(`This voucher is only valid for a specific payment method`);
       return;
    }
    
    setAppliedVoucher(voucher);
    setPromoCode('');
  };

  const handleRemovePromo = () => {
    setAppliedVoucher(null);
    setPromoCode('');
    setVoucherError('');
  };

  // Re-validate voucher when payment method changes
  useEffect(() => {
    if (appliedVoucher && appliedVoucher.paymentMethod && appliedVoucher.paymentMethod !== paymentMethod) {
      setVoucherError(`Voucher ${appliedVoucher.code} removed (invalid payment method)`);
      setAppliedVoucher(null);
    }
  }, [paymentMethod, appliedVoucher]);

  const handleCheckout = () => {
    if (!user) return;
    setOrdering(true);
    setTimeout(() => {
      placeOrder(user.id, user.name);
      setOrdering(false);
      navigate('/customer/orders');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-full bg-brand-bg flex items-center justify-center mb-6 text-brand-text-muted"
        >
          <ShoppingBag size={40} />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-brand-text-muted mb-8 max-w-sm">Looks like you haven't added anything yet.</p>
        <Button3D onClick={() => navigate('/customer')}>{t('menu')}</Button3D>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black mb-2">{t('yourOrder')}</h2>
        </div>
        <button 
          onClick={clearCart}
          className="text-sm font-bold text-red-500 hover:text-red-400 flex items-center transition-colors"
        >
          <Trash2 size={16} className="mr-1" /> Clear
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.food.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="flex items-center gap-4 p-4 bg-brand-card rounded-2xl border border-brand-border">
                  <img src={item.food.image} alt={item.food.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shadow-sm" />
                  <div className="flex-1">
                    <h4 className="font-bold text-base sm:text-lg text-brand-text">{item.food.name}</h4>
                    <p className="text-brand-text-muted font-bold">${item.food.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 bg-brand-bg rounded-xl p-1 border border-brand-border">
                    <button 
                      onClick={() => removeFromCart(item.food.id)}
                      className="p-1 sm:p-2 hover:bg-brand-card rounded-lg transition-colors text-brand-text"
                    >
                      {item.quantity === 1 ? <Trash2 size={14} className="text-red-400" /> : <Minus size={14} />}
                    </button>
                    <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => addToCart(item.food)}
                      className="p-1 sm:p-2 hover:bg-brand-card rounded-lg transition-colors text-brand-text"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="md:col-span-1 space-y-6">
          {/* Voucher Code */}
          <div className="bg-brand-card rounded-2xl p-6 border border-brand-border">
             <h3 className="text-lg font-bold mb-4 text-brand-text flex items-center gap-2"><Ticket size={20} className="text-brand-pink" /> Promo Code</h3>
             {!appliedVoucher ? (
               <>
                 <div className="flex gap-2">
                   <input 
                     type="text" 
                     value={promoCode}
                     onChange={(e) => setPromoCode(e.target.value)}
                     placeholder="Enter voucher code" 
                     className="flex-1 bg-brand-bg border border-brand-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-pink text-brand-text uppercase font-bold tracking-wider placeholder:normal-case placeholder:tracking-normal placeholder:font-normal" 
                   />
                   <button onClick={handleApplyPromo} className="bg-brand-text text-brand-bg px-4 py-2 rounded-xl text-sm font-bold hover:bg-brand-pink hover:text-white transition-colors">Apply</button>
                 </div>
                 {voucherError && <p className="text-red-500 text-xs font-bold mt-2">{voucherError}</p>}
                 
                 <div className="mt-4">
                   <p className="text-xs font-bold text-brand-text-muted mb-2">Available Offers:</p>
                   <div className="flex flex-wrap gap-2">
                     {AVAILABLE_VOUCHERS.map(v => (
                       <button 
                         key={v.code} 
                         onClick={() => setPromoCode(v.code)}
                         className="text-[10px] bg-brand-pink/5 border border-brand-pink/20 text-brand-pink px-2 py-1 rounded-md font-bold hover:bg-brand-pink/10 transition-colors uppercase tracking-wider"
                       >
                         {v.code}
                       </button>
                     ))}
                   </div>
                 </div>
               </>
             ) : (
               <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
                 <div>
                   <span className="text-green-700 font-bold text-sm block">{appliedVoucher.code}</span>
                   <span className="text-green-600 text-xs font-medium">{appliedVoucher.title}</span>
                 </div>
                 <button onClick={handleRemovePromo} className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors">
                   <Trash2 size={16} />
                 </button>
               </div>
             )}
          </div>

          <div className="bg-brand-card rounded-2xl p-6 border border-brand-border sticky top-24">
            <h3 className="text-xl font-bold mb-6 text-brand-text">Summary</h3>
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between text-brand-text-muted">
                <span>{t('subtotal')}</span>
                <span className="text-brand-text">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-brand-text-muted">
                <span>Platform Fee</span>
                <span className="text-brand-text">${platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-brand-text-muted">
                <span>{t('delivery')}</span>
                <span className={deliveryFee === 0 ? "text-brand-pink font-bold" : "text-brand-text"}>
                  {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              {autoDiscount > 0 && (
                <div className="flex justify-between text-brand-text-muted">
                  <span>Tiered Discount</span>
                  <span className="text-green-500 font-bold">-${autoDiscount.toFixed(2)}</span>
                </div>
              )}
              {isVoucherValid && voucherDiscount > 0 && (
                <div className="flex justify-between text-brand-text-muted">
                  <span>Promo ({appliedVoucher?.code})</span>
                  <span className="text-green-500 font-bold">-${voucherDiscount.toFixed(2)}</span>
                </div>
              )}
              {useWallet && (
                <div className="flex justify-between text-brand-text-muted">
                  <span>pandaPay Balance Applied</span>
                  <span className="text-green-500 font-bold">-${Math.min(walletBalance, total).toFixed(2)}</span>
                </div>
              )}
              <div className="h-px bg-brand-border w-full my-4" />
              <div className="flex justify-between text-lg font-black text-brand-text">
                <span>{t('total')}</span>
                <span className="text-brand-text">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-6 space-y-4">
              <h4 className="text-sm font-bold text-brand-text">Payment Method</h4>
              
              {/* Tier 4: pandaPay (In-App Digital Wallet) */}
              <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${useWallet ? 'border-brand-pink bg-brand-pink/5' : 'border-brand-border bg-brand-bg hover:border-brand-pink/50'}`}>
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={useWallet} 
                    onChange={() => setUseWallet(!useWallet)}
                    className="w-5 h-5 rounded text-brand-pink focus:ring-brand-pink border-brand-text-muted" 
                  />
                  <div>
                    <span className="text-sm font-bold text-brand-text block flex items-center gap-2">
                       pandaPay <span className="text-[10px] bg-brand-pink text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Wallet</span>
                    </span>
                    <span className="text-xs text-brand-text-muted">Available: ${walletBalance.toFixed(2)}</span>
                  </div>
                </div>
              </label>

              {finalTotal > 0 && (
                <div className="space-y-3 pt-3 border-t border-brand-border">
                  {/* Tier 1: Cash on Delivery (COD) */}
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-brand-pink bg-brand-pink/5' : 'border-brand-border bg-brand-bg hover:border-brand-pink/50'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="w-4 h-4 text-brand-pink focus:ring-brand-pink border-brand-border" 
                    />
                    <span className="text-sm font-bold text-brand-text">Cash on Delivery (COD)</span>
                  </label>

                  {/* Tier 2: Mobile Financial Services (MFS) */}
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'mfs_bkash' ? 'border-[#E2136E] bg-[#E2136E]/5' : 'border-brand-border bg-brand-bg hover:border-[#E2136E]/30'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="mfs_bkash"
                      checked={paymentMethod === 'mfs_bkash'}
                      onChange={() => setPaymentMethod('mfs_bkash')}
                      className="w-4 h-4 text-[#E2136E] focus:ring-[#E2136E] border-brand-border" 
                    />
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-sm font-bold text-brand-text">bKash</span>
                      <span className="text-[10px] bg-brand-bg text-brand-text-muted px-2 py-1 rounded border border-brand-border">Saved Account</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'mfs_nagad' ? 'border-[#F04B26] bg-[#F04B26]/5' : 'border-brand-border bg-brand-bg hover:border-[#F04B26]/30'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="mfs_nagad"
                      checked={paymentMethod === 'mfs_nagad'}
                      onChange={() => setPaymentMethod('mfs_nagad')}
                      className="w-4 h-4 text-[#F04B26] focus:ring-[#F04B26] border-brand-border" 
                    />
                    <span className="text-sm font-bold text-brand-text">Nagad</span>
                  </label>

                  {/* Tier 3: Cards & Digital Banking */}
                  <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-brand-pink bg-brand-pink/5' : 'border-brand-border bg-brand-bg hover:border-brand-pink/50'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="w-4 h-4 text-brand-pink focus:ring-brand-pink border-brand-border" 
                      />
                      <span className="text-sm font-bold text-brand-text">Credit/Debit Card</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-8 h-5 bg-blue-900 rounded flex items-center justify-center text-[8px] text-white font-bold italic">VISA</div>
                      <div className="w-8 h-5 bg-orange-500 rounded flex items-center justify-center text-[8px] text-white font-bold italic">MC</div>
                    </div>
                  </label>
                </div>
              )}
            </div>

            <Button3D 
              className="w-full relative overflow-hidden" 
              onClick={handleCheckout}
              disabled={ordering}
            >
              <span className={`transition-opacity duration-300 ${ordering ? 'opacity-0' : 'opacity-100'}`}>
                {t('placeOrder')}
              </span>
              {ordering && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                </span>
              )}
            </Button3D>
          </div>
        </div>
      </div>
    </div>
  );
}

function Orders() {
  const { orders, reorder } = useStore();
  const { user } = useAuth();
  const t = useTranslation(user?.language);
  const navigate = useNavigate();
  
  const userOrders = orders.filter(o => o.customerId === user?.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const activeOrders = userOrders.filter(o => o.status !== 'delivered');
  const pastOrders = userOrders.filter(o => o.status === 'delivered');

  const handleReorder = (order: typeof orders[0]) => {
    reorder(order.items);
    navigate('/customer/cart');
  };

  // Lazy-load jsPDF and autotable dynamically only when the user triggers an invoice download.
  // This keeps ~390 kB of PDF generation code out of the critical app chunk.
  const downloadInvoice = async (order: typeof orders[0]) => {
    const [{ default: jsPDF }] = await Promise.all([
      import('jspdf'),
      import('jspdf-autotable')
    ]);

    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(226, 19, 110); // Brand pink
    doc.text('foodpanda', 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Invoice / E-Receipt', 14, 28);

    // Order Details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Order ID: #${order.id.slice(0, 8)}`, 14, 40);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 14, 46);
    doc.text(`Customer: ${order.customerName}`, 14, 52);

    // Items Table
    const tableData = order.items.map(item => [
      item.quantity.toString(),
      item.food.name,
      `$${item.food.price.toFixed(2)}`,
      `$${(item.food.price * item.quantity).toFixed(2)}`
    ]);

    (doc as any).autoTable({
      startY: 60,
      head: [['Qty', 'Item', 'Unit Price', 'Total']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [226, 19, 110] },
      margin: { top: 60 }
    });

    // Totals
    const finalY = (doc as any).lastAutoTable.finalY || 60;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Paid: $${order.total.toFixed(2)}`, 14, finalY + 10);

    // Footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    doc.text('Thank you for ordering with foodpanda!', 14, finalY + 30);

    doc.save(`foodpanda-invoice-${order.id.slice(0, 8)}.pdf`);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'preparing': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'on_the_way': return 'text-brand-pink bg-brand-pink/10 border-brand-pink/20';
      case 'delivered': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-brand-text-muted bg-brand-bg border-brand-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return <Clock size={16} />;
      case 'preparing': return <UtensilsCrossed size={16} />;
      case 'on_the_way': return <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity }}><ChevronRight size={16} /></motion.div>;
      case 'delivered': return <CheckCircle2 size={16} />;
      default: return null;
    }
  };

  const TRACKING_STEPS = [
    { id: 'pending', label: 'Accepted' },
    { id: 'preparing', label: 'Preparing' },
    { id: 'on_the_way', label: 'Picked Up' },
    { id: 'delivered', label: 'Delivered' }
  ];

  if (userOrders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-2">{t('noOrders')}</h2>
        <p className="text-brand-text-muted mb-8 max-w-sm">When you place an order, it will appear here for tracking.</p>
        <Link to="/customer">
          <Button3D>Order Now</Button3D>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {activeOrders.length > 0 && (
        <div>
          <h2 className="text-3xl font-black mb-6 flex items-center gap-2"><MapPin className="text-brand-pink" /> Live Tracking</h2>
          <div className="space-y-6">
            {activeOrders.map((order, idx) => {
              const currentStepIndex = TRACKING_STEPS.findIndex(step => step.id === order.status);
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="bg-brand-card rounded-2xl border border-brand-pink/30 shadow-lg shadow-brand-pink/5 overflow-hidden">
                    {/* Live Map Header */}
                    <div className="h-64 w-full relative bg-brand-bg">
                      {hasValidKey ? (
                        <APIProvider apiKey={API_KEY} version="weekly">
                          <Map
                            defaultCenter={{lat: 23.8103, lng: 90.4125}} // Dhaka center
                            defaultZoom={14}
                            mapId="DEMO_MAP_ID"
                            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                            style={{width: '100%', height: '100%'}}
                            disableDefaultUI={true}
                          >
                            <AdvancedMarker position={{lat: 23.8103, lng: 90.4125}}>
                              <div className="w-10 h-10 bg-brand-pink rounded-full flex items-center justify-center shadow-lg border-2 border-white relative">
                                <Package size={20} className="text-white" />
                                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-pink border-2 border-white"></span>
                                </span>
                              </div>
                            </AdvancedMarker>
                          </Map>
                        </APIProvider>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-brand-bg">
                          <Package size={48} className="text-brand-pink mb-2 opacity-30" />
                          <p className="text-sm font-bold text-brand-text">Map API Key Required</p>
                          <p className="text-xs text-brand-text-muted mt-1 max-w-xs mx-auto">Add GOOGLE_MAPS_PLATFORM_KEY in Settings &gt; Secrets to view the live tracking map.</p>
                        </div>
                      )}
                      
                      {/* Floating ETA Card */}
                      <div className="absolute top-4 left-4 right-4 sm:right-auto sm:w-64 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-md border border-white/50">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-brand-text-muted uppercase tracking-wider">Estimated Delivery</span>
                          <span className="text-xs font-bold text-brand-pink">20-30 min</span>
                        </div>
                        <h4 className="text-2xl font-black text-brand-text">7:45 PM</h4>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6 bg-brand-card">
                      {/* Step Progress Bar */}
                      <div className="mb-8">
                        <div className="flex justify-between relative">
                          <div className="absolute top-1/2 left-0 w-full h-1 bg-brand-border -translate-y-1/2 z-0"></div>
                          <div 
                            className="absolute top-1/2 left-0 h-1 bg-brand-pink -translate-y-1/2 z-0 transition-all duration-500"
                            style={{ width: `${(Math.max(0, currentStepIndex) / (TRACKING_STEPS.length - 1)) * 100}%` }}
                          ></div>
                          
                          {TRACKING_STEPS.map((step, i) => {
                            const isCompleted = i <= currentStepIndex;
                            const isCurrent = i === currentStepIndex;
                            return (
                              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                                  isCompleted ? 'bg-brand-pink border-brand-pink text-white' : 'bg-brand-card border-brand-border text-brand-text-muted'
                                }`}>
                                  {isCompleted ? <CheckCircle2 size={14} /> : <div className="w-2 h-2 rounded-full bg-brand-border"></div>}
                                </div>
                                <span className={`text-[10px] sm:text-xs font-bold ${isCurrent ? 'text-brand-pink' : isCompleted ? 'text-brand-text' : 'text-brand-text-muted'}`}>
                                  {step.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Rider Contact details (if on the way) */}
                      {order.status === 'on_the_way' && (
                        <div className="flex items-center justify-between p-4 bg-brand-bg rounded-xl border border-brand-border mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-brand-pink/10 rounded-full flex items-center justify-center border border-brand-pink/20">
                              <span className="text-xl">🛵</span>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-brand-text">Ali Khan</h4>
                              <p className="text-xs text-brand-text-muted flex items-center gap-1">
                                <Star size={12} className="text-amber-500 fill-current" /> 4.9 • Delivery Partner
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-3 bg-brand-card border border-brand-border rounded-full hover:text-brand-pink hover:border-brand-pink transition-colors shadow-sm">
                              <MessageSquare size={18} />
                            </button>
                            <button className="p-3 bg-brand-pink text-white rounded-full hover:bg-brand-pink/90 transition-colors shadow-md shadow-brand-pink/20">
                              <Phone size={18} />
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-4 border-t border-brand-border">
                        <div>
                          <p className="text-xs text-brand-text-muted font-medium">Order #{order.id.slice(0, 8)}</p>
                          <p className="text-sm font-bold text-brand-text">{order.items.length} items</p>
                        </div>
                        <button className="text-brand-pink text-sm font-bold hover:underline">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {pastOrders.length > 0 && (
        <div>
          <h2 className="text-2xl font-black mb-6 mt-8">Past Orders</h2>
          <div className="space-y-4">
            {pastOrders.map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="bg-brand-card rounded-2xl p-4 sm:p-6 border border-brand-border">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-brand-border pb-4">
                    <div>
                      <h3 className="text-lg font-bold flex items-center gap-2 text-brand-text">
                        Order {order.id.slice(0, 8)}
                      </h3>
                      <p className="text-xs text-brand-text-muted mt-1">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className={`px-4 py-2 rounded-full border flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.replace(/_/g, ' ')}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.food.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3">
                          <span className="font-black text-brand-text bg-brand-bg px-2 py-1 rounded-md border border-brand-border">{item.quantity}x</span>
                          <span className="font-medium text-brand-text">{item.food.name}</span>
                        </div>
                        <span className="text-brand-text-muted">${(item.food.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-brand-border flex justify-between items-center font-black">
                    <span className="text-brand-text">Total</span>
                    <span className="text-xl text-brand-text">${order.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={() => handleReorder(order)}
                      className="flex-1 flex items-center justify-center gap-2 bg-brand-pink text-white py-3 rounded-xl font-bold hover:bg-brand-pink/90 transition-colors shadow-sm"
                    >
                      <RefreshCcw size={18} />
                      Reorder
                    </button>
                    <button 
                      onClick={() => downloadInvoice(order)}
                      className="flex-1 flex items-center justify-center gap-2 bg-brand-bg border border-brand-border text-brand-text py-3 rounded-xl font-bold hover:border-brand-text-muted hover:bg-brand-card transition-colors shadow-sm"
                    >
                      <FileText size={18} />
                      Download Invoice
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function CustomerDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const t = useTranslation(user?.language);
  
  return (
    <div className="pb-24 sm:pb-8">
      {/* Sub-navigation (Hidden since we have side/top/bottom navs) */}
      <Routes>
        <Route path="/" element={<FoodMenu />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<CustomerProfile />} />
        <Route path="/support" element={<CustomerSupport />} />
        <Route path="/addresses" element={<CustomerAddresses />} />
      </Routes>
    </div>
  );
}

