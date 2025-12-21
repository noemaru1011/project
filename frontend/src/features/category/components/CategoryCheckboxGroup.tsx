import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import type { Props } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { useCategoryOptions } from '@/features/category/hooks/useCategoryOptions';

type CategoryCheckboxGroupProps = Omit<Props, 'options'> & { disabled?: boolean };

export const CategoryCheckboxGroup = ({ disabled, ...props }: CategoryCheckboxGroupProps) => {
  const { options, loading } = useCategoryOptions();

  return <CheckboxGroup {...props} options={options} disabled={loading || disabled} />;
};
