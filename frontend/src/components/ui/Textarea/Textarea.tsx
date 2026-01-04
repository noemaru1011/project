import React from 'react';

type Props = {
  id?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ id, label, error, required, disabled, helperText, className, ...rest }, ref) => {
    //アクセシビリティ用
    const errorId = error ? `${id}-error` : undefined;
    const helpId = helperText ? `${id}-help` : undefined;
    return (
      <div className="flex flex-col space-y-1 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <textarea
          id={id}
          ref={ref}
          disabled={disabled}
          className={`
            ${className || ''}
            w-full
            min-h-[100px]
            px-3 py-2
            rounded-lg
            border
            border-gray-300
            bg-white
            text-gray-900
            placeholder-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:border-indigo-500
            disabled:bg-gray-100
            disabled:text-gray-400
            transition
            duration-200
            ease-in-out
          `}
          aria-invalid={!!error}
          aria-required={required}
          aria-describedby={[errorId, helpId].filter(Boolean).join(' ') || undefined}
          {...rest}
        />

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        {helperText && !error && <p className="text-gray-500 text-sm ml-1">{helperText}</p>}
      </div>
    );
  },
);
