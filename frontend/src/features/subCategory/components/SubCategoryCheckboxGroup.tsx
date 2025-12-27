import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { useSubCategoryOptions } from '@/features/subCategory/hooks/useSubCategoryOptions';

type Props = {
  error?: string;
  required?: boolean;
  disabled?: boolean;
} & Omit<React.ComponentProps<typeof CheckboxGroup>, 'options' | 'label' | 'column'>;

export const SubCategoryCheckboxGroup = ({ error, required, disabled, ...rest }: Props) => {
  const { options, loading } = useSubCategoryOptions();
  return (
    <CheckboxGroup
      options={options}
      label="中分類"
      required={required}
      error={error}
      disabled={disabled || loading}
      column={4}
      {...rest}
    />
  );
};
