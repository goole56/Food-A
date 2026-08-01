import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';

export interface Card3DProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: React.ReactNode;
}

export const Card3D = React.forwardRef<HTMLDivElement, Card3DProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{
          scale: 1.05,
          rotateX: 5,
          rotateY: 5,
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1), 0 0 15px rgba(226,27,112,0.15)',
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn(
          'relative rounded-2xl bg-brand-bg backdrop-blur-md border border-brand-border/50 p-6',
          'transform-gpu preserve-3d',
          className
        )}
        style={{ transformStyle: 'preserve-3d' }}
        {...props}
      >
        <div style={{ transform: 'translateZ(30px)' }} className="h-full">
          {children}
        </div>
      </motion.div>
    );
  }
);

Card3D.displayName = 'Card3D';
