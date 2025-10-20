import React from "react";
import type { InputType } from "@/types/ui";

type Props = {
  id: string;
  label?: string;
  type: InputType;
  value: string;
  disabled?: boolean;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const Input = ({
  id,
  label,
  type,
  value,
  required,
  disabled,
  onChange,
  error,
}: Props) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={id} className="font-bold text-gray-700">
          {label}
          {required && <span className="font-bold text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={
          "border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-400 "
        }
      />
      {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
      {disabled && <input type="hidden" value={value?.toString()} />}
    </div>
  );
};

export default Input;
