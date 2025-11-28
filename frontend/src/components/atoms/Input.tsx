import React from 'react';
import type { InputType } from '@/interface/ui';

type Props = {
  id: string;
  label?: string;
  type: InputType;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      label,
      type,
      error,
      required,
      disabled,
      leftIcon,
      rightIcon,
      helperText,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label htmlFor={id} className="text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-0 flex items-center pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            id={id}
            type={type}
            ref={ref}
            disabled={disabled}
            className={`w-full rounded-lg focus:ring focus:ring-indigo-100 border-b transition-colors focus:outline-none focus:border-b-2 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-400 placeholder:text-gray-400
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${leftIcon ? 'pl-6' : ''}
              ${rightIcon ? 'pr-6' : ''}
              ${className || ''}`}
            autoComplete="off"
            {...rest}
          />

          {rightIcon && (
            <div className="absolute right-0 flex items-center text-gray-400">{rightIcon}</div>
          )}
        </div>

        {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
        {helperText && !error && <p className="text-gray-500 text-sm ml-1">{helperText}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
