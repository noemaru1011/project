import React from "react";

type Props = {
  id: string;
  label?: string;
  value: string | number;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
};

const TextArea = ({ id, label, value, disabled, onChange, error }: Props) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={id} className="font-bold text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-400"
      />
      {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
      {disabled && <input type="hidden" id={id} value={value?.toString()} />}
    </div>
  );
};

export default TextArea;
