import React from 'react';

type Props = {
  id?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Radio = React.forwardRef<HTMLInputElement, Props>(
  ({ id, label, disabled, error, helperText, ...rest }, ref) => {
    //アクセシビリティ用
    const errorId = error ? `${id}-error` : undefined;
    const helpId = helperText ? `${id}-help` : undefined;
    return (
      <div className="flex items-center space-x-2">
        <input
          id={id}
          type="radio"
          ref={ref}
          disabled={disabled}
          className="border rounded-sm accent-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
          aria-invalid={!!error}
          aria-describedby={[errorId, helpId].filter(Boolean).join(' ') || undefined}
          {...rest}
        />
        {label && (
          <label htmlFor={id} className="text-gray-700 font-medium">
            {label}
          </label>
        )}

        {error && (
          <div id={errorId} role="alert" className="text-red-500 text-sm ml-1">
            {error}
          </div>
        )}

        {helperText && !error && (
          <div id={helpId} role="note" className="text-gray-500 text-sm ml-1">
            {helperText}
          </div>
        )}
      </div>
    );
  },
);
