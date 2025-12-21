import { CheckboxGroup } from '@/components/molecules/CheckboxGroup';
import type { Props } from '@/components/molecules/CheckboxGroup';
import { useMinorCategoryOptions } from '@/features/minorCategory/hooks/useMinorCategoryOptions';

type MinorCategoryCheckboxGroupProps = Omit<Props, 'options'> & { disabled?: boolean };

export const MinorCategoryCheckboxGroup = ({
  disabled,
  ...props
}: MinorCategoryCheckboxGroupProps) => {
  const { options, loading } = useMinorCategoryOptions();

  return <CheckboxGroup {...props} options={options} disabled={loading || disabled} />;
};
