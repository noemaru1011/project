import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { gradeOptions } from '@/features/grade/constants/gradeOptions';

type Props = {
  error?: string;
  required?: boolean;
  disabled?: boolean;
} & Omit<React.ComponentProps<typeof CheckboxGroup>, 'options' | 'label' | 'column'>;

export const GradeCheckboxGroup = ({ error, required, disabled, ...rest }: Props) => {
  return (
    <CheckboxGroup
      options={gradeOptions}
      label="学年"
      required={required}
      error={error}
      disabled={disabled}
      column={4}
      {...rest}
    />
  );
};
