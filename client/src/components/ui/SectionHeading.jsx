import React from 'react';
import { Badge } from './Badge';

/**
 * Standardized Section Heading Component
 */
export const SectionHeading = ({
  badgeText,
  title,
  subtitle,
  centered = false,
  className = '',
  titleColor = 'default',
}) => {
  const alignmentClass = centered ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl';
  const colorClass = titleColor === 'white' ? 'text-white' : 'text-slate-900';

  return (
    <div className={`mb-8 sm:mb-12 ${alignmentClass} ${className}`}>
      {badgeText && (
        <div className="mb-3">
          <Badge variant="amber">{badgeText}</Badge>
        </div>
      )}
      <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${colorClass}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base sm:text-lg ${titleColor === 'white' ? 'text-slate-300' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
