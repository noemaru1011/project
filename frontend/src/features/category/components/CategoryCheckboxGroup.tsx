import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { useCategoryOptions } from '@/features/category/hooks/useCategoryOptions';

type Props = Omit<React.ComponentProps<typeof CheckboxGroup>, 'options' | 'label' | 'column'>;

export const CategoryCheckboxGroup = ({ disabled, ...props }: Props) => {
  const { options, loading } = useCategoryOptions();
  return (
    <CheckboxGroup
      {...props}
      options={options}
      label="大分類"
      disabled={disabled || loading}
      column={4}
    />
  );
};
