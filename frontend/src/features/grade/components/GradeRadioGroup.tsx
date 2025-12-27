import { RadioGroup } from '@/components/ui/RadioGroup/RadioGroup';
import type { Props } from '@/components/ui/RadioGroup/RadioGroup';
import { gradeOptions } from '@/features/grade/constants/gradeOptions';

type GradeRadioGroupProps = Omit<Props, 'options'> & { disabled?: boolean };

export const GradeRadioGroup = ({ disabled, ...props }: GradeRadioGroupProps) => {
  return (
    <RadioGroup {...props} label="学年" column={4} options={gradeOptions} disabled={disabled} />
  );
};
