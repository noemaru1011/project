import { useCallback } from 'react';
import type { Option } from '@/types/ui';
import { Radio } from '@/components/atoms/Radio';

type Props = {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options: Option[];
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
};

export const RadioGroup = ({
  name,
  value = '',
  onChange,
  options,
  label,
  error,
  required,
  disabled,
}: Props) => {
  const handleChange = useCallback(
    (val: string) => {
      onChange?.(val);
    },
    [onChange],
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
        <Radio
          key={option.value}
          id={`${name}-${option.value}`}
          name={name} // ← ラジオボタンは name が同一でないと排他的にならない
          label={option.label}
          checked={value === option.value} // ← 単一比較に変更
          disabled={disabled}
          onChange={() => handleChange(option.value)}
        />
      ))}

      {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
    </fieldset>
  );
};
