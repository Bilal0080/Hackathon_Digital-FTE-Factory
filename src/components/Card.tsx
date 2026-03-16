import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, title, icon, extra }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-factory-card border border-factory-border rounded-lg overflow-hidden relative",
        className
      )}
    >
      {title && (
        <div className="px-4 py-3 border-b border-factory-border flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-2">
            {icon && <span className="text-factory-accent">{icon}</span>}
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {extra && <div className="flex items-center">{extra}</div>}
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-factory-border" />
              <div className="w-1.5 h-1.5 rounded-full bg-factory-border" />
            </div>
          </div>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </motion.div>
  );
};
