import React from 'react';
import { useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import type { Option } from '@/types/ui';
import { Checkbox } from '@/components/elements/Checkbox';

type Props = {
  name: string;
  control: Control<any>;
  options: Option[];
  label?: string;
  error?: string;
  required?: boolean;
};

export const CheckboxGroup: React.FC<Props> = ({
  name,
  control,
  options,
  label,
  error,
  required,
}) => {
  const { field } = useController({ name, control, rules: { required } });

  const handleChange = (value: string) => {
    const newValue = field.value?.includes(value)
      ? field.value.filter((v: string) => v !== value)
      : [...(field.value || []), value];
    field.onChange(newValue);
  };

  return (
    <fieldset className="flex flex-col space-y-1 border p-2 rounded">
      {label && (
        <legend className="font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </legend>
      )}
      {options.map((option) => (
        <Checkbox
          key={option.value}
          id={`${name}-${option.value}`}
          label={option.label}
          checked={field.value?.includes(option.value)}
          onChange={() => handleChange(option.value)}
        />
      ))}
      {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
    </fieldset>
  );
};
