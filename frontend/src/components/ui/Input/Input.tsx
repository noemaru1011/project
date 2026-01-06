import React from 'react';
import clsx from 'clsx';
import type { AllowedInputType } from './types';

type Props = {
  id?: string;
  label?: string;
  type?: AllowedInputType;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

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
      inputClassName,
      labelClassName,
      ...rest
    },
    ref,
  ) => {
    const errorId = error ? `${id}-error` : undefined;
    const helpId = helperText ? `${id}-help` : undefined;

    return (
      <div className={clsx('flex flex-col space-y-1', className)}>
        {label && (
          <label htmlFor={id} className={clsx('text-sm font-medium text-gray-700', labelClassName)}>
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
            className={clsx(
              'w-full rounded-lg border-b transition-colors focus:outline-none focus:border-b-2 focus:border-indigo-500 focus:ring focus:ring-indigo-100',
              'disabled:bg-gray-100 disabled:text-gray-400 placeholder:text-gray-400',
              {
                'border-red-500': error,
                'border-gray-300': !error,
                'pl-6': leftIcon,
                'pr-6': rightIcon,
              },
              inputClassName,
            )}
            autoComplete="off"
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={[errorId, helpId].filter(Boolean).join(' ') || undefined}
            {...rest}
          />

          {rightIcon && (
            <div className="absolute right-0 flex items-center text-gray-400">{rightIcon}</div>
          )}
        </div>

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
