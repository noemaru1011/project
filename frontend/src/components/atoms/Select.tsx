import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { Option } from '@/interface/ui';

type Props = {
  id: string;
  label?: string;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  error?: string;
  leftIcon?: React.ReactNode;
  helperText?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, Props>(
  (
    { id, label, options, required, disabled, error, leftIcon, helperText, className, ...rest },
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
            <div className="absolute left-3 flex items-center pointer-events-none text-gray-400 z-10">
              {leftIcon}
            </div>
          )}

          <select
            id={id}
            ref={ref}
            disabled={disabled}
            className={`w-full appearance-none bg-white border rounded-lg px-3 py-2.5 pr-10 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer
              ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
              ${leftIcon ? 'pl-10' : ''}
              ${className || ''}`}
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

        {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
        {helperText && !error && <p className="text-gray-500 text-sm ml-1">{helperText}</p>}
      </div>
    );
  },
);
