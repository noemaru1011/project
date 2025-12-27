import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { useMinorCategoryOptions } from '@/features/minorCategory/hooks/useMinorCategoryOptions';

type Props = {
  error?: string;
  required?: boolean;
  disabled?: boolean;
} & Omit<React.ComponentProps<typeof CheckboxGroup>, 'options' | 'label' | 'column'>;

export const MinorCategoryCheckboxGroup = ({ error, required, disabled, ...rest }: Props) => {
  const { options, loading } = useMinorCategoryOptions();
  return (
    <CheckboxGroup
      options={options}
      label="小分類"
      required={required}
      error={error}
      disabled={disabled || loading}
      column={4}
      {...rest}
    />
  );
};
