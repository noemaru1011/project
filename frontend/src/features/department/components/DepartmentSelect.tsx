import { Select } from '@/components/ui/Select/Select';
import { Library } from 'lucide-react';
import type { Props } from '@/components/ui/Select/Select';
import { useDepartmentOptions } from '@/features/department/hooks/useDepartmentOptions';

type DepartmentSelectProps = Omit<Props, 'id' | 'options'> & { disabled?: boolean };

export const DepartmentSelect = ({ disabled, ...props }: DepartmentSelectProps) => {
  const { options, loading } = useDepartmentOptions();

  return (
    <Select
      {...props}
      label="学科名"
      id="departmentId"
      options={options}
      leftIcon={<Library className="size-4" />}
      disabled={loading || disabled}
    />
  );
};
