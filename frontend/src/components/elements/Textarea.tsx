import React from "react";

type Props = {
  id: string;
  label?: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ id, label, error, required, disabled, className, ...rest }, ref) => {
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
          className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-400"
          {...rest}
        />

        {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
        {disabled && <input type="hidden" value={rest.value?.toString()} />}
      </div>
    );
  }
);

export default TextArea;
