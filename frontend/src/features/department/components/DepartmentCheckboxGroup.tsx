import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { useDepartmentOptions } from '@/features/department/hooks/useDepartmentOptions';

type Props = Omit<React.ComponentProps<typeof CheckboxGroup>, 'options' | 'label' | 'column'>;

export const DepartmentCheckboxGroup = ({ disabled, ...rest }: Props) => {
  const { options, loading } = useDepartmentOptions();
  return (
    <CheckboxGroup
      {...rest}
      options={options}
      label="学科"
      disabled={disabled || loading}
      column={7}
    />
  );
};
