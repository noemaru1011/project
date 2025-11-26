import { useCallback } from 'react';
import type { Option } from '@/interface/ui';
import { Checkbox } from '@/components/atoms/Checkbox';

type Props = {
  name?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  options: Option[];
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
};

export const CheckboxGroup = ({
  name,
  value = [],
  onChange,
  options,
  label,
  error,
  required,
  disabled,
}: Props) => {
  const handleChange = useCallback(
    (val: string) => {
      const newValue = value.includes(val) ? value.filter((v) => v !== val) : [...value, val];
      onChange?.(newValue);
    },
    [value, onChange],
  );

  return (
    <fieldset className="flex flex-col space-y-1 border p-2 rounded" disabled={disabled}>
      {label && (
        <legend className="font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </legend>
      )}

      {options.map((option) => (
        <Checkbox
          key={option.value}
          id={`${name ?? 'checkbox'}-${option.value}`}
          label={option.label}
          checked={value.includes(option.value)}
          onChange={() => handleChange(option.value)}
        />
      ))}

      {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
    </fieldset>
  );
};
