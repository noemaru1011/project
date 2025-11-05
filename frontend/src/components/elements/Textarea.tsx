import React from "react";

type Props = {
  id: string;
  label?: string;
  value?: String;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.ChangeEvent<any>) => void;
  error?: string;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ id, label, error, required, disabled, value, onChange, onBlur }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label htmlFor={id} className="font-bold text-gray-700">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          disabled={disabled}
          value={value?.toString()}
          className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-400"
          onChange={onChange}
          onBlur={onBlur}
        />

        {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
      </div>
    );
  }
);

export default TextArea;
