import React from "react";

type Props = {
  id: string;
  label: string;
  error?: string;
  checked?: boolean;
  value?: string | boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
};

const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      label,
      error,
      checked,
      value,
      required = false,
      disabled = false,
      onChange,
      onBlur,
    },
    ref
  ) => {
    return (
      <div className="flex items-center space-x-2">
        <input
          id={id}
          type="checkbox"
          ref={ref}
          disabled={disabled}
          checked={checked}
          value={typeof value === "boolean" ? String(value) : value}
          className="border rounded-sm accent-blue-600 disabled:bg-gray-100"
          onChange={onChange}
          onBlur={onBlur}
        />
        <label htmlFor={id} className="text-gray-700 font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
        {disabled && value && (
          <input type="hidden" name={id} value={String(value)} />
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
