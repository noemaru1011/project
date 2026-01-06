import React from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import type { Option } from '@/components/ui/option';

type Props = {
  id?: string;
  label?: string;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  error?: string;
  leftIcon?: React.ReactNode;
  helperText?: string;
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, Props>(
  (
    {
      id,
      label,
      options,
      required,
      disabled,
      error,
      leftIcon,
      helperText,
      className,
      selectClassName,
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
            <div className="absolute left-3 flex items-center pointer-events-none text-gray-400 z-10">
              {leftIcon}
            </div>
          )}

          <select
            id={id}
            ref={ref}
            disabled={disabled}
            className={clsx(
              'w-full appearance-none bg-white border rounded-lg px-3 py-2.5 pr-10 transition-all cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
              'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
              {
                'border-red-500 focus:ring-red-500 focus:border-red-500': error,
                'border-gray-300': !error,
                'pl-10': leftIcon,
              },
              selectClassName,
            )}
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={[errorId, helpId].filter(Boolean).join(' ') || undefined}
            {...rest}
          >
            <option value="">選択してください</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3 flex items-center pointer-events-none text-gray-400">
            <ChevronDown className="size-4" />
          </div>
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
