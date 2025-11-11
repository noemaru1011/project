import React from "react";

type Props = {
  id: string;
  label: string;
  error?: string;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>; // ← react-hook-form用

export const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ id, label, error, checked, required, disabled, ...rest }, ref) => {
    return (
      <div className="flex items-center space-x-2">
        <input
          id={id}
          type="checkbox"
          ref={ref}
          disabled={disabled}
          checked={checked}
          className="border rounded-sm accent-blue-600 disabled:bg-gray-100"
          {...rest}
        />
        <label htmlFor={id} className="text-gray-700 font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
      </div>
    );
  }
);
