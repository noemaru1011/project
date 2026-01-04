import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { useSubCategoryOptions } from '@/features/subCategory/hooks/useSubCategoryOptions';

type Props = Omit<React.ComponentProps<typeof CheckboxGroup>, 'options' | 'label' | 'column'>;

export const SubCategoryCheckboxGroup = ({ disabled, ...rest }: Props) => {
  const { options, loading } = useSubCategoryOptions();
  return (
    <CheckboxGroup
      {...rest}
      options={options}
      label="中分類"
      disabled={disabled || loading}
      column={4}
    />
  );
};
