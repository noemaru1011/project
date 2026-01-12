import { RadioGroup } from '@/components/ui/RadioGroup/RadioGroup';
import { useStatusOptions } from '@/features/status/hooks/useStatusOptions';

type Props = Omit<
  React.ComponentProps<typeof RadioGroup>,
  'options' | 'label' | 'column' | 'required'
>;

export const StatusRadioGroup = ({ disabled, ...rest }: Props) => {
  const { options, loading } = useStatusOptions();

  return (
    <RadioGroup
      {...rest}
      options={options}
      label="ステータス"
      column={8}
      required
      disabled={loading || disabled}
    />
  );
};
