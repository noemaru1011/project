import { RadioGroup } from '@/components/molecules/RadioGroup';
import type { Props } from '@/components/molecules/RadioGroup';
import { useStatusOptions } from '@/features/status/hooks/useStatusOptions';

type StatusRadioGroupProps = Omit<Props, 'options'> & { disabled?: boolean };

export const StatusRadioGroup = ({ disabled, ...props }: StatusRadioGroupProps) => {
  const { options, loading } = useStatusOptions();

  return <RadioGroup {...props} options={options} disabled={loading || disabled} />;
};
