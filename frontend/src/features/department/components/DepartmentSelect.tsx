import { Select } from '@/components/atoms/Select';
import { Library } from 'lucide-react';
import type { Props } from '@/components/atoms/Select';
import { useDepartmentOptions } from '@/features/department/hooks/useDepartmentOptions';

type DepartmentSelectProps = Omit<Props, 'id' | 'options'> & { disabled?: boolean };

export const DepartmentSelect = ({ disabled, ...props }: DepartmentSelectProps) => {
  const { options, loading } = useDepartmentOptions();

  return (
    <Select
      {...props}
      id="departmentId"
      options={options}
      leftIcon={<Library className="size-4" />}
      disabled={loading || disabled}
    />
  );
};
