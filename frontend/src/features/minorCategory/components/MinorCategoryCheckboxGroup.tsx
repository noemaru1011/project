import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import type { Props } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { useMinorCategoryOptions } from '@/features/minorCategory/hooks/useMinorCategoryOptions';

type MinorCategoryCheckboxGroupProps = Omit<Props, 'options'> & { disabled?: boolean };

export const MinorCategoryCheckboxGroup = ({
  disabled,
  ...props
}: MinorCategoryCheckboxGroupProps) => {
  const { options, loading } = useMinorCategoryOptions();

  return <CheckboxGroup {...props} options={options} disabled={loading || disabled} />;
};
