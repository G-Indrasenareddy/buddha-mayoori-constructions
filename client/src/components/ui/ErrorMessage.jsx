import React from 'react';

/**
 * Accessible Error Message Component
 */
export const ErrorMessage = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  className = '',
}) => {
  return (
    <div
      role="alert"
      className={`p-4 rounded-md bg-red-50 border border-red-200 text-red-900 ${className}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-semibold text-red-800">{title}</h3>
          <p className="mt-1 text-sm text-red-700">{message}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 text-xs font-semibold text-red-800 underline hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
