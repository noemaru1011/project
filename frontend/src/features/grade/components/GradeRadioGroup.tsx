import { RadioGroup } from '@/components/ui/RadioGroup/RadioGroup';
import { gradeOptions } from '@/features/grade/constants/gradeOptions';

type Props = Omit<
  React.ComponentProps<typeof RadioGroup>,
  'options' | 'label' | 'column' | 'required'
>;

export const GradeRadioGroup = ({ ...rest }: Props) => {
  return <RadioGroup {...rest} label="学年" required column={4} options={gradeOptions} />;
};
