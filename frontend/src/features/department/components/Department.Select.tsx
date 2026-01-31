import { Select } from '@/components/ui/Select/Select';
import { Library } from 'lucide-react';
import { useDepartmentOptions } from '@/features/department/hooks/useDepartmentOptions';

type Props = Omit<
  React.ComponentProps<typeof Select>,
  'options' | 'id' | 'label' | 'leftIcon' | 'required'
>;

export const DepartmentSelect = ({ disabled, ...rest }: Props) => {
  const { options, isLoading } = useDepartmentOptions();

  return (
    <Select
      {...rest}
      label="学科名"
      id="departmentId"
      options={options}
      leftIcon={<Library className="size-4" />}
      disabled={isLoading || disabled}
      required
    />
  );
};
