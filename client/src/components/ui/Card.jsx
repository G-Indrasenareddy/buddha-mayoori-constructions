import React from 'react';

/**
 * Foundation Surface Card Component
 */
export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  padding = 'default',
  ...props
}) => {
  const paddingClasses = {
    none: 'p-0',
    compact: 'p-4',
    default: 'p-6',
    large: 'p-8',
  };

  const hoverClass = hoverEffect ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-amber-300' : '';

  return (
    <div
      className={`bg-white border border-slate-200 rounded-lg shadow-sm ${paddingClasses[padding] || paddingClasses.default} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
