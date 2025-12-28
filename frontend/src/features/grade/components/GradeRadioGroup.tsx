import { RadioGroup } from '@/components/ui/RadioGroup/RadioGroup';
import { gradeOptions } from '@/features/grade/constants/gradeOptions';

type Props = Omit<React.ComponentProps<typeof RadioGroup>, 'options' | 'label' | 'column'>;

export const GradeRadioGroup = ({ ...props }: Props) => {
  return <RadioGroup {...props} label="学年" column={4} options={gradeOptions} />;
};
