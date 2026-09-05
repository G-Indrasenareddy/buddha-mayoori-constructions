import React from 'react';

/**
 * Accessible Loading Indicator Component
 */
export const LoadingSpinner = ({
  size = 'md',
  label = 'Loading content...',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      role="status"
      aria-label={label}
      className={`inline-flex flex-col items-center justify-center p-4 ${className}`}
    >
      <div
        className={`animate-spin rounded-full border-amber-600 border-t-transparent ${sizeClasses[size] || sizeClasses.md}`}
      ></div>
      <span className="sr-only">{label}</span>
    </div>
  );
};
