import { CheckboxGroup } from '@/components/molecules/CheckboxGroup';
import type { Props } from '@/components/molecules/CheckboxGroup';
import { gradeOptions } from '@/features/grade/constants/gradeOptions';

type GradeCheckboxGroupProps = Omit<Props, 'options'>;

export const GradeCheckboxGroup = ({ disabled, ...props }: GradeCheckboxGroupProps) => {
  return <CheckboxGroup {...props} options={gradeOptions} />;
};
