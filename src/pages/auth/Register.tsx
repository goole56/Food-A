import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card3D } from '../../components/ui/Card3D';
import { Button3D } from '../../components/ui/Button3D';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Phone, User, ArrowRight, ShieldCheck, ChevronLeft } from 'lucide-react';

export function Register() {
  const [view, setView] = useState<'main' | 'email' | 'phone'>('main');
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) return;
    
    if (view === 'phone' && !showOtp) {
      setShowOtp(true);
      return;
    }

    if (view === 'phone' && showOtp && !otp) {
      return;
    }
    
    login(identifier, 'customer');
    navigate('/customer');
  };

  const handleSocialLogin = (provider: string) => {
    login(`user@${provider}.com`, 'customer');
    navigate('/customer');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4 sm:px-0">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-border">
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {view === 'main' ? (
                <motion.div key="main" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-black mb-2 text-brand-text">
                      Create Account
                    </h2>
                    <p className="text-brand-text-muted font-medium">Sign up for foodpanda</p>
                  </div>

                  <div className="space-y-3">
                    <button onClick={() => handleSocialLogin('google')} className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                      <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                      <span className="text-sm font-bold text-gray-700">Continue with Google</span>
                    </button>
                    
                    <button onClick={() => handleSocialLogin('facebook')} className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-[#1877F2] text-white rounded-xl hover:bg-[#166FE5] transition-colors shadow-sm">
                      <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5 filter brightness-0 invert" />
                      <span className="text-sm font-bold">Continue with Facebook</span>
                    </button>
                    
                    <button onClick={() => setView('phone')} className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-brand-pink text-white rounded-xl hover:bg-brand-pink/90 transition-colors shadow-sm">
                      <Phone className="w-5 h-5" />
                      <span className="text-sm font-bold">Continue with Phone Number</span>
                    </button>
                  </div>

                  <div className="my-6 flex items-center">
                    <div className="flex-grow h-px bg-brand-border"></div>
                    <span className="px-4 text-xs font-bold text-brand-text-muted uppercase tracking-wider">OR</span>
                    <div className="flex-grow h-px bg-brand-border"></div>
                  </div>

                  <button onClick={() => setView('email')} className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-brand-bg border border-brand-border text-brand-text rounded-xl hover:bg-brand-card transition-colors shadow-sm">
                    <Mail className="w-5 h-5 text-brand-text-muted" />
                    <span className="text-sm font-bold">Sign up with Email</span>
                  </button>

                  <p className="text-center text-[11px] text-brand-text-muted mt-8 leading-relaxed max-w-sm mx-auto">
                    By continuing, you agree to our <br/>
                    <a href="#" className="text-brand-pink font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-brand-pink font-bold hover:underline">Privacy Policy</a>.
                  </p>

                  <p className="text-center mt-6 text-sm text-brand-text-muted font-medium">
                    Already have an account?{' '}
                    <Link to="/login" className="text-brand-pink hover:text-brand-pink font-bold transition-colors">
                      Log in
                    </Link>
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <button 
                      onClick={() => { setView('main'); setShowOtp(false); }}
                      className="p-2 bg-brand-bg rounded-full hover:bg-brand-card transition-colors text-brand-text"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <h2 className="text-2xl font-black text-brand-text">
                      {view === 'email' ? 'Sign up with Email' : 'Sign up with Phone'}
                    </h2>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-5">
                    <AnimatePresence mode="wait">
                      {!showOtp ? (
                        <motion.div key="credentials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                          {view === 'email' && (
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-brand-text ml-1">Full Name</label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <User className="h-5 w-5 text-brand-text-muted" />
                                </div>
                                <input
                                  type="text"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  className="w-full pl-10 pr-4 py-3 bg-brand-bg border border-brand-border focus:border-brand-pink focus:ring-1 focus:ring-brand-pink rounded-xl text-brand-text placeholder-brand-text-muted/60 transition-all outline-none"
                                  placeholder="John Doe"
                                  required
                                />
                              </div>
                            </div>
                          )}

                          <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-text ml-1">
                              {view === 'email' ? 'Email Address' : 'Phone Number'}
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {view === 'email' ? (
                                  <Mail className="h-5 w-5 text-brand-text-muted" />
                                ) : (
                                  <Phone className="h-5 w-5 text-brand-text-muted" />
                                )}
                              </div>
                              <input
                                type={view === 'email' ? 'email' : 'tel'}
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-brand-bg border border-brand-border focus:border-brand-pink focus:ring-1 focus:ring-brand-pink rounded-xl text-brand-text placeholder-brand-text-muted/60 transition-all outline-none"
                                placeholder={view === 'email' ? "Enter your email" : "+880 1XXX-XXXXXX"}
                                required
                              />
                            </div>
                          </div>
                          
                          {view === 'email' && (
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-brand-text ml-1">Password</label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Lock className="h-5 w-5 text-brand-text-muted" />
                                </div>
                                <input
                                  type="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  className="w-full pl-10 pr-4 py-3 bg-brand-bg border border-brand-border focus:border-brand-pink focus:ring-1 focus:ring-brand-pink rounded-xl text-brand-text placeholder-brand-text-muted/60 transition-all outline-none"
                                  placeholder="••••••••"
                                  required
                                />
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div key="otp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                           <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-text ml-1">Enter OTP Code</label>
                            <p className="text-xs text-brand-text-muted ml-1 mb-2">We sent a code to {identifier}</p>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <ShieldCheck className="h-5 w-5 text-brand-text-muted" />
                              </div>
                              <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-brand-bg border border-brand-border focus:border-brand-pink focus:ring-1 focus:ring-brand-pink rounded-xl text-brand-text tracking-[0.5em] font-mono transition-all outline-none"
                                placeholder="000000"
                                maxLength={6}
                                required
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button3D type="submit" className="w-full mt-8 flex justify-center items-center gap-2">
                      {view === 'phone' && !showOtp ? (
                        <>Send OTP <ArrowRight size={18} /></>
                      ) : (
                        'Create Account'
                      )}
                    </Button3D>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
