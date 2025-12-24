import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { useSubCategoryOptions } from '@/features/subCategory/hooks/useSubCategoryOptions';

type SubCategoryCheckboxGroupProps = {
  name: string;
  value: number[];
  onChange: (values: number[]) => void;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  column?: number;
};

export const SubCategoryCheckboxGroup = ({
  name,
  value,
  onChange,
  label,
  error,
  required,
  disabled,
  column,
}: SubCategoryCheckboxGroupProps) => {
  const { options, loading } = useSubCategoryOptions();

  return (
    <CheckboxGroup
      name={name}
      value={value.map(String)}
      onChange={(vals) => onChange(vals.map(Number))}
      label={label}
      required={required}
      error={error}
      column={column}
      options={options}
      disabled={loading || disabled}
    />
  );
};
