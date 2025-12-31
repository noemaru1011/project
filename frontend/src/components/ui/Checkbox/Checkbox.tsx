import React from 'react';

type Props = {
  id?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ id, label, disabled, error, helperText, className, ...rest }, ref) => {
    //アクセシビリティ用
    const errorId = error ? `${id}-error` : undefined;
    const helpId = helperText ? `${id}-help` : undefined;
    return (
      <div className="flex items-center space-x-2 ">
        <input
          id={id}
          type="checkbox"
          ref={ref}
          disabled={disabled}
          className={`
          w-5 h-5 rounded-md accent-indigo-600
          border-gray-300 hover:border-indigo-400
          disabled:bg-gray-100 disabled:border-gray-200 disabled:cursor-not-allowed
          transition-colors duration-200
        `}
          aria-invalid={!!error}
          aria-describedby={[errorId, helpId].filter(Boolean).join(' ') || undefined}
          {...rest}
        />
        {label && (
          <label htmlFor={id} className="text-gray-700 font-medium select-none ">
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
