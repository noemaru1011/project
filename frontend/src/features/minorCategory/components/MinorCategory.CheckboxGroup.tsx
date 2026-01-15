import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { useMinorCategoryOptions } from '@/features/minorCategory/hooks/useMinorCategoryOptions';

type Props = Omit<React.ComponentProps<typeof CheckboxGroup>, 'options' | 'label' | 'column'>;

export const MinorCategoryCheckboxGroup = ({ disabled, ...rest }: Props) => {
  const { options, loading } = useMinorCategoryOptions();
  return (
    <CheckboxGroup {...rest} options={options} label="小分類" disabled={disabled || loading} />
  );
};
