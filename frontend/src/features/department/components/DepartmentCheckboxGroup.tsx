import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { useDepartmentOptions } from '@/features/department/hooks/useDepartmentOptions';

type DepartmentCheckboxGroupProps = {
  name: string;
  value: number[];
  onChange: (values: number[]) => void;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  column?: number;
};

export const DepartmentCheckboxGroup = ({
  name,
  value,
  onChange,
  label,
  error,
  required,
  disabled,
  column,
}: DepartmentCheckboxGroupProps) => {
  const { options, loading } = useDepartmentOptions();

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
