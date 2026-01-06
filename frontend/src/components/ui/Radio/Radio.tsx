import React from 'react';
import clsx from 'clsx';

type Props = {
  id?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Radio = React.forwardRef<HTMLInputElement, Props>(
  (
    { id, label, disabled, error, helperText, className, inputClassName, labelClassName, ...rest },
    ref,
  ) => {
    const errorId = error ? `${id}-error` : undefined;
    const helpId = helperText ? `${id}-help` : undefined;

    return (
      <div className={clsx('flex items-center space-x-2', className)}>
        <input
          id={id}
          type="radio"
          ref={ref}
          disabled={disabled}
          className={clsx(
            'border rounded-sm accent-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed',
            inputClassName,
          )}
          aria-invalid={!!error}
          aria-describedby={[errorId, helpId].filter(Boolean).join(' ') || undefined}
          {...rest}
        />
        {label && (
          <label htmlFor={id} className={clsx('text-gray-700 font-medium', labelClassName)}>
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
