import React from 'react';

export const StatusBadge = ({ status }) => {
  const getStatusStyles = (val) => {
    switch (val) {
      case 'NEW':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CONTACTED':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'IN_PROGRESS':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'ARCHIVED':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'CONFIRMED_FROM_PROVIDED_MATERIAL':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'REQUIRES_BUSINESS_CONFIRMATION':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const formatStatusText = (val) => {
    if (val === 'CONFIRMED_FROM_PROVIDED_MATERIAL') return 'Confirmed Claim';
    if (val === 'REQUIRES_BUSINESS_CONFIRMATION') return 'Requires Confirmation';
    return val;
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusStyles(status)}`}>
      {formatStatusText(status)}
    </span>
  );
};
