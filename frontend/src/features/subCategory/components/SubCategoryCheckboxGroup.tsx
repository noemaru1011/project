import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { useSubCategoryOptions } from '@/features/subCategory/hooks/useSubCategoryOptions';

type Props = Omit<React.ComponentProps<typeof CheckboxGroup>, 'options' | 'label' | 'column'>;

export const SubCategoryCheckboxGroup = ({ disabled, ...props }: Props) => {
  const { options, loading } = useSubCategoryOptions();
  return (
    <CheckboxGroup
      {...props}
      options={options}
      label="中分類"
      disabled={disabled || loading}
      column={4}
    />
  );
};
