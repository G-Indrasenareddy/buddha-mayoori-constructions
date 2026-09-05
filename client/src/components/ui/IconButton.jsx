import React from 'react';

/**
 * Accessible IconButton Primitive
 */
export const IconButton = React.forwardRef(({
  children,
  ariaLabel,
  variant = 'ghost',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  ...props
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px]";

  const variantClasses = {
    ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200",
    dark: "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950",
    amber: "bg-amber-600 text-slate-900 hover:bg-amber-500 active:bg-amber-700",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900",
  };

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.ghost} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

IconButton.displayName = 'IconButton';
