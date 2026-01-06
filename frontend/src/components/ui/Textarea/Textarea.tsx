import React from 'react';
import clsx from 'clsx';

type Props = {
  id?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      id,
      label,
      error,
      required,
      disabled,
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
      <div className={clsx('flex flex-col space-y-1 w-full', className)}>
        {label && (
          <label htmlFor={id} className={clsx('text-sm font-medium text-gray-700', labelClassName)}>
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <textarea
          id={id}
          ref={ref}
          disabled={disabled}
          className={clsx(
            'w-full min-h-[100px] px-3 py-2 rounded-lg border bg-white text-gray-900 placeholder-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
            'disabled:bg-gray-100 disabled:text-gray-400 transition duration-200 ease-in-out',
            {
              'border-red-500 focus:ring-red-500 focus:border-red-500': error,
              'border-gray-300': !error,
            },
            inputClassName,
          )}
          aria-invalid={!!error}
          aria-required={required}
          aria-describedby={[errorId, helpId].filter(Boolean).join(' ') || undefined}
          {...rest}
        />

        {error && (
          <p id={errorId} className="text-sm text-red-500 mt-1">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helpId} className="text-gray-500 text-sm ml-1">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
