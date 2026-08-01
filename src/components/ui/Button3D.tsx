import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';

export interface Button3DProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button3D = React.forwardRef<HTMLButtonElement, Button3DProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'relative inline-flex items-center justify-center font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-xl transform-gpu';
    
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const variantClasses = {
      primary: 'bg-brand-pink text-white shadow-[0_4px_14px_0_rgba(226,27,112,0.39)] hover:shadow-[0_6px_20px_rgba(226,27,112,0.23)] border border-brand-pink hover:bg-brand-pink-hover',
      secondary: 'bg-brand-card text-brand-text hover:bg-brand-border border border-brand-border shadow-sm',
      outline: 'bg-transparent text-brand-pink border-2 border-brand-pink hover:bg-brand-pink/10',
      danger: 'bg-red-500 text-white shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] border border-red-500 hover:bg-red-600',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95, y: 0 }}
        className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
        {...props}
      >
        <span className="relative flex items-center gap-2 drop-shadow-md">
          {children as React.ReactNode}
        </span>
      </motion.button>
    );
  }
);

Button3D.displayName = 'Button3D';
