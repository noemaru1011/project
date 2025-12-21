import { RadioGroup } from '@/components/ui/RadioGroup/RadioGroup';
import type { Props } from '@/components/ui/RadioGroup/RadioGroup';
import { gradeOptions } from '@/features/grade/constants/gradeOptions';

type GradeRadioGroupProps = Omit<Props, 'options'>;

export const GradeRadioGroup = ({ disabled, ...props }: GradeRadioGroupProps) => {
  return <RadioGroup {...props} options={gradeOptions} />;
};
