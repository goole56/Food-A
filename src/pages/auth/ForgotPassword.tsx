import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card3D } from '../../components/ui/Card3D';
import { Button3D } from '../../components/ui/Button3D';
import { motion } from 'motion/react';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Simulate sending email
    setSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="w-full max-w-md perspective-1000"
      >
        <Card3D className="p-8">
          <Link to="/login" className="inline-flex items-center text-brand-text-muted hover:text-brand-text transition-colors mb-6 text-sm font-bold">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Login
          </Link>

          {!submitted ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-black mb-2 text-brand-text">
                  Reset Password
                </h2>
                <p className="text-brand-text-muted font-medium">Enter your email and we'll send you a recovery link.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-text ml-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-brand-text-muted" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-brand-bg border border-brand-border focus:border-brand-pink focus:ring-1 focus:ring-brand-pink rounded-xl text-brand-text placeholder-brand-text-muted/60 transition-all outline-none"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <Button3D type="submit" className="w-full">
                  Send Recovery Link
                </Button3D>
              </form>
            </>
          ) : (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-text mb-2">Check your email</h3>
              <p className="text-brand-text-muted">
                We sent a password reset link to <span className="text-brand-text font-medium">{email}</span>
              </p>
              <Button3D variant="outline" className="mt-8" onClick={() => setSubmitted(false)}>
                Try another email
              </Button3D>
            </motion.div>
          )}
        </Card3D>
      </motion.div>
    </div>
  );
}
