import React from 'react';

/**
 * Standardized Section Wrapper Component
 */
export const Section = ({
  children,
  id,
  className = '',
  background = 'default', // default (light), white, dark, subtle
  padding = 'default', // default, compact, large, none
  ...props
}) => {
  const bgClasses = {
    default: 'bg-slate-50 text-slate-900',
    white: 'bg-white text-slate-900',
    dark: 'bg-slate-900 text-white',
    subtle: 'bg-slate-100 text-slate-900',
  };

  const paddingClasses = {
    default: 'py-12 sm:py-16 lg:py-20',
    compact: 'py-8 sm:py-12',
    large: 'py-16 sm:py-24 lg:py-32',
    none: 'py-0',
  };

  return (
    <section
      id={id}
      className={`${bgClasses[background] || bgClasses.default} ${paddingClasses[padding] || paddingClasses.default} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};
