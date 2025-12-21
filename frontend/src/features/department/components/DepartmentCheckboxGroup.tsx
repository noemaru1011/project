import { CheckboxGroup } from '@/components/molecules/CheckboxGroup';
import type { Props } from '@/components/molecules/CheckboxGroup';
import { useDepartmentOptions } from '@/features/department/hooks/useDepartmentOptions';

type DepartmentCheckboxGroupProps = Omit<Props, 'options'> & { disabled?: boolean };

export const DepartmentCheckboxGroup = ({ disabled, ...props }: DepartmentCheckboxGroupProps) => {
  const { options, loading } = useDepartmentOptions();

  return <CheckboxGroup {...props} options={options} disabled={loading || disabled} />;
};
