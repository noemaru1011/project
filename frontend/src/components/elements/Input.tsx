import React from "react";
import type { InputType } from "@/types/ui";

type Props = {
  id: string;
  label?: string;
  type: InputType;
  value?: String;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.ChangeEvent<any>) => void;
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    { id, label, type, error, required, disabled, value, onChange, onBlur },
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

        <input
          id={id}
          type={type}
          ref={ref}
          disabled={disabled}
          value={value?.toString()}
          className="border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-400"
          onChange={onChange}
          onBlur={onBlur}
        />

        {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
        {disabled && <input type="hidden" value={value?.toString()} />}
      </div>
    );
  }
);
export default Input;
