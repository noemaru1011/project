import React from 'react';

type Props = {
  id: string;
  label?: string;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Radio = React.forwardRef<HTMLInputElement, Props>(
  ({ id, label, disabled, ...rest }, ref) => (
    <div className="flex items-center space-x-2">
      <input
        id={id}
        type="radio"
        ref={ref}
        disabled={disabled}
        className="border rounded-sm accent-blue-600 disabled:bg-gray-100"
        {...rest}
      />
      {label && (
        <label htmlFor={id} className="text-gray-700 font-medium">
          {label}
        </label>
      )}
    </div>
  ),
);
