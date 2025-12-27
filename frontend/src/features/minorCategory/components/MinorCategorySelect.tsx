import { Select } from '@/components/ui/Select/Select';
import { Group } from 'lucide-react';
import type { Props } from '@/components/ui/Select/Select';
import { useMinorCategoryOptions } from '@/features/minorCategory/hooks/useMinorCategoryOptions';

type MinorCategorySelectProps = Omit<Props, 'id' | 'options'> & { disabled?: boolean };

export const MinorCategorySelect = ({ disabled, ...props }: MinorCategorySelectProps) => {
  const { options, loading } = useMinorCategoryOptions();

  return (
    <Select
      {...props}
      label="小分類名"
      id="minorCategoryId"
      options={options}
      leftIcon={<Group className="size-4" />}
      disabled={loading || disabled}
    />
  );
};
