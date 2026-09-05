import React from 'react';

/**
 * Foundation Responsive Layout Container
 * Max Width: 1280px (max-w-7xl)
 */
export const Container = ({
  children,
  className = '',
  clean = false,
  ...props
}) => {
  const paddingClass = clean ? '' : 'px-4 sm:px-6 lg:px-8';
  return (
    <div
      className={`max-w-7xl mx-auto w-full ${paddingClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
