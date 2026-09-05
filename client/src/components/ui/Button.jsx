import React from 'react';

/**
 * Foundation Button Primitive
 * Variants: primary (amber), secondary (navy outline), dark (slate), ghost
 * Sizes: sm, md, lg
 */
export const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  type = 'button',
  onClick,
  className = '',
  ariaLabel,
  ...props
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none min-h-[44px]";

  const variantClasses = {
    primary: "bg-amber-600 text-slate-900 hover:bg-amber-500 active:bg-amber-700 shadow-sm",
    secondary: "border-2 border-slate-900 text-slate-900 bg-transparent hover:bg-slate-900 hover:text-white active:bg-slate-800",
    dark: "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 shadow-sm",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200",
    danger: "bg-red-600 text-white hover:bg-red-500 active:bg-red-700 shadow-sm",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs min-h-[38px]",
    md: "px-5 py-2.5 text-sm min-h-[44px]",
    lg: "px-7 py-3.5 text-base min-h-[50px]",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${widthClass} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2.5 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
