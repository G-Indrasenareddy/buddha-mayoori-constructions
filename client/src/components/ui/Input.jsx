import React from 'react';

/**
 * Accessible Text Input Component
 */
export const Input = React.forwardRef(({
  id,
  label,
  type = 'text',
  error,
  helperText,
  required = false,
  className = '',
  placeholder,
  value,
  onChange,
  disabled = false,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const errorId = inputId ? `${inputId}-error` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-slate-900 mb-1.5"
        >
          {label}
          {required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        aria-required={required}
        className={`w-full px-4 py-2.5 rounded-md border text-slate-900 bg-white text-base sm:text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500 disabled:bg-slate-100 disabled:cursor-not-allowed ${
          error ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-300 hover:border-slate-400'
        } ${className}`}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-600 font-medium">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="mt-1.5 text-xs text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
