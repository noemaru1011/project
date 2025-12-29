import { RadioGroup } from '@/components/ui/RadioGroup/RadioGroup';
import { useStatusOptions } from '@/features/status/hooks/useStatusOptions';

type Props = Omit<
  React.ComponentProps<typeof RadioGroup>,
  'options' | 'label' | 'column' | 'required'
>;

export const StatusRadioGroup = ({ disabled, ...props }: Props) => {
  const { options, loading } = useStatusOptions();

  return (
    <RadioGroup
      {...props}
      options={options}
      label="状況"
      column={7}
      required
      disabled={loading || disabled}
    />
  );
};
