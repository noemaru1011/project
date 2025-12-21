import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import type { Props } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { gradeOptions } from '@/features/grade/constants/gradeOptions';

type GradeCheckboxGroupProps = Omit<Props, 'options'>;

export const GradeCheckboxGroup = ({ disabled, ...props }: GradeCheckboxGroupProps) => {
  return <CheckboxGroup {...props} options={gradeOptions} />;
};
