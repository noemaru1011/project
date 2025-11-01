import React from "react";
import type { Option } from "@/types/ui";

type Props = {
  id: string;
  label?: string;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  value?: string;
};

const Select = React.forwardRef<HTMLSelectElement, Props>(
  (
    { id, label, options, required, disabled, error, onChange, onBlur, value },
    ref
  ) => {
    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label htmlFor={id} className="font-bold text-gray-700">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <select
          id={id}
          ref={ref}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500  disabled:bg-gray-100 disabled:text-gray-400 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">選択してください</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
        {disabled && value && <input type="hidden" value={value} name={id} />}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
