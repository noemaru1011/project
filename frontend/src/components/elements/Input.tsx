import React from "react";
import type { InputType } from "@/types/ui";

type Props = {
  id: string;
  label?: string;
  type: InputType;
  error?: string;
  required?: boolean;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>; // ← react-hook-form用

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ id, label, type, error, required, disabled, ...rest }, ref) => {
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
          className={`border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-400
            ${error ? "border-red-500" : "border-gray-300"}`}
          autoComplete="off"
          {...rest} // registerのonChange, onBlur, name, valueがここに入る
        />

        {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
      </div>
    );
  }
);

export default Input;
