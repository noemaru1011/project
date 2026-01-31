import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { useCategoryOptions } from '@/features/category/hooks/useCategoryOptions';

type Props = Omit<React.ComponentProps<typeof CheckboxGroup>, 'options' | 'label' | 'column'>;

export const CategoryCheckboxGroup = ({ disabled, ...rest }: Props) => {
  const { options, isLoading } = useCategoryOptions();
  return (
    <CheckboxGroup {...rest} options={options} label="大分類" disabled={disabled || isLoading} />
  );
};
