import React from 'react';

/**
 * Foundation Tag Badge Component
 */
export const Badge = ({
  children,
  variant = 'amber',
  size = 'md',
  className = '',
}) => {
  const variantClasses = {
    amber: 'bg-amber-100 text-amber-900 border border-amber-300',
    navy: 'bg-slate-900 text-amber-400 border border-slate-700',
    gray: 'bg-slate-100 text-slate-700 border border-slate-200',
    success: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
    outline: 'bg-transparent text-slate-700 border border-slate-300',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center font-semibold tracking-wider uppercase rounded ${variantClasses[variant] || variantClasses.amber} ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {children}
    </span>
  );
};
