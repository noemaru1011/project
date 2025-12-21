import React from 'react';

type Props = {
  id: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Radio = React.forwardRef<HTMLInputElement, Props>(
  ({ id, label, disabled, error, helperText, ...rest }, ref) => (
    <div className="flex items-center space-x-2">
      <input
        id={id}
        type="radio"
        ref={ref}
        disabled={disabled}
        className="border rounded-sm accent-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
        {...rest}
      />
      {label && (
        <label htmlFor={id} className="text-gray-700 font-medium">
          {label}
        </label>
      )}
      {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
      {helperText && !error && <p className="text-gray-500 text-sm ml-1">{helperText}</p>}
    </div>
  ),
);
