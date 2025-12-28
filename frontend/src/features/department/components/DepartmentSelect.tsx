import { Select } from '@/components/ui/Select/Select';
import { Library } from 'lucide-react';
import { useDepartmentOptions } from '@/features/department/hooks/useDepartmentOptions';

type Props = Omit<
  React.ComponentProps<typeof Select>,
  'options' | 'id' | 'label' | 'leftIcon' | 'required'
>;

export const DepartmentSelect = ({ disabled, ...props }: Props) => {
  const { options, loading } = useDepartmentOptions();

  return (
    <Select
      {...props}
      label="学科名"
      id="departmentId"
      options={options}
      leftIcon={<Library className="size-4" />}
      disabled={loading || disabled}
      required
    />
  );
};
