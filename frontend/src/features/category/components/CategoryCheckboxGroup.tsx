import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { useCategoryOptions } from '@/features/category/hooks/useCategoryOptions';

type Props = {
  error?: string;
  required?: boolean;
  disabled?: boolean;
} & Omit<React.ComponentProps<typeof CheckboxGroup>, 'options' | 'label' | 'column'>;

export const CategoryCheckboxGroup = ({ error, required, disabled, ...rest }: Props) => {
  const { options, loading } = useCategoryOptions();
  return (
    <CheckboxGroup
      options={options}
      label="大分類"
      required={required}
      error={error}
      disabled={disabled || loading}
      column={4}
      {...rest}
    />
  );
};
