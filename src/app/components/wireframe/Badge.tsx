import React from 'react';
import { cn } from './Button';

export function Badge({ className, children, variant = 'outline', ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'outline' | 'secondary' }) {
  const variants = {
    default: 'border-transparent bg-neutral-900 text-neutral-50 hover:bg-neutral-900/80',
    secondary: 'border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80',
    outline: 'text-neutral-950 border-neutral-200',
  };
  
  return (
    <div className={cn(
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2',
      variants[variant],
      className
    )} {...props}>
      {children}
    </div>
  );
}
