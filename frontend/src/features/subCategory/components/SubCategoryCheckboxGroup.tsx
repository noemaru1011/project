import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import type { Props } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { useSubCategoryOptions } from '@/features/subCategory/hooks/useSubCategoryOptions';

type SubCategoryCheckboxGroupProps = Omit<Props, 'options'> & { disabled?: boolean };

export const SubCategoryCheckboxGroup = ({ disabled, ...props }: SubCategoryCheckboxGroupProps) => {
  const { options, loading } = useSubCategoryOptions();

  return <CheckboxGroup {...props} options={options} disabled={loading || disabled} />;
};
