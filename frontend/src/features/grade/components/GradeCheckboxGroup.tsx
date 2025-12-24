import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { gradeOptions } from '@/features/grade/constants/gradeOptions';

type GradeCheckboxGroupProps = {
  name: string;
  value: number[];
  onChange: (values: number[]) => void;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  column?: number;
};

export const GradeCheckboxGroup = ({
  name,
  value,
  onChange,
  label,
  error,
  required,
  disabled,
  column,
}: GradeCheckboxGroupProps) => {
  return (
    <CheckboxGroup
      name={name}
      value={value.map(String)}
      onChange={(vals) => onChange(vals.map(Number))}
      options={gradeOptions}
      label={label}
      required={required}
      error={error}
      disabled={disabled}
      column={column}
    />
  );
};
