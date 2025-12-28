import { Select } from '@/components/ui/Select/Select';
import { Group } from 'lucide-react';
import { useMinorCategoryOptions } from '@/features/minorCategory/hooks/useMinorCategoryOptions';

type Props = Omit<
  React.ComponentProps<typeof Select>,
  'options' | 'id' | 'label' | 'leftIcon' | 'required'
>;

export const MinorCategorySelect = ({ disabled, ...props }: Props) => {
  const { options, loading } = useMinorCategoryOptions();

  return (
    <Select
      {...props}
      label="小分類名"
      id="minorCategoryId"
      options={options}
      leftIcon={<Group className="size-4" />}
      disabled={loading || disabled}
      required
    />
  );
};
