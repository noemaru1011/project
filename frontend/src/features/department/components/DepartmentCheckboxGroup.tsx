import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { useDepartmentOptions } from '@/features/department/hooks/useDepartmentOptions';

type Props = {
  error?: string;
  required?: boolean;
  disabled?: boolean;
} & Omit<React.ComponentProps<typeof CheckboxGroup>, 'options' | 'label' | 'column'>;

export const DepartmentCheckboxGroup = ({ error, required, disabled, ...rest }: Props) => {
  const { options, loading } = useDepartmentOptions();
  return (
    <CheckboxGroup
      options={options}
      label="学科"
      required={required}
      error={error}
      disabled={disabled || loading}
      column={4}
      {...rest}
    />
  );
};
