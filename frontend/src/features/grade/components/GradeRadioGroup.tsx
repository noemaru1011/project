import { RadioGroup } from '@/components/molecules/RadioGroup';
import type { Props } from '@/components/molecules/RadioGroup';
import { gradeOptions } from '@/features/grade/constants/gradeOptions';

type GradeRadioGroupProps = Omit<Props, 'options'>;

export const GradeRadioGroup = ({ disabled, ...props }: GradeRadioGroupProps) => {
  return <RadioGroup {...props} options={gradeOptions} />;
};
