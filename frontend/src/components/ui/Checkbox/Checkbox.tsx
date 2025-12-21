import React from 'react';

type Props = {
  id: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ id, label, disabled, error, helperText, className, ...rest }, ref) => (
    <div className="flex items-center space-x-2">
      <input
        id={id}
        type="checkbox"
        ref={ref}
        disabled={disabled}
        className={`
          w-5 h-5 rounded-md accent-indigo-600
          border-gray-300 hover:border-indigo-400
          disabled:bg-gray-100 disabled:border-gray-200
          transition-colors duration-200
        `}
        {...rest}
      />
      {label && (
        <label htmlFor={id} className="text-gray-700 font-medium select-none">
          {label}
        </label>
      )}
      {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
      {helperText && !error && <p className="text-gray-500 text-sm ml-1">{helperText}</p>}
    </div>
  ),
);
