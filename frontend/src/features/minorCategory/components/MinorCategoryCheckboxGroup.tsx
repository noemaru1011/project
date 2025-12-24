import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { useMinorCategoryOptions } from '@/features/minorCategory/hooks/useMinorCategoryOptions';

type MinorCategoryCheckboxGroupProps = {
  name: string;
  value: number[];
  onChange: (values: number[]) => void;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  column?: number;
};

export const MinorCategoryCheckboxGroup = ({
  name,
  value,
  onChange,
  label,
  error,
  required,
  disabled,
  column,
}: MinorCategoryCheckboxGroupProps) => {
  const { options, loading } = useMinorCategoryOptions();

  return (
    <CheckboxGroup
      name={name}
      value={value.map(String)}
      onChange={(vals) => onChange(vals.map(Number))}
      options={options}
      label={label}
      required={required}
      error={error}
      disabled={loading || disabled}
      column={column}
    />
  );
};
