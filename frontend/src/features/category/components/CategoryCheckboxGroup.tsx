import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { useCategoryOptions } from '@/features/category/hooks/useCategoryOptions';

type CategoryCheckboxGroupProps = {
  name: string;
  value: number[];
  onChange: (values: number[]) => void;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  column?: number;
};

export const CategoryCheckboxGroup = ({
  name,
  value,
  onChange,
  label,
  error,
  required,
  disabled,
  column,
}: CategoryCheckboxGroupProps) => {
  const { options, loading } = useCategoryOptions();

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
