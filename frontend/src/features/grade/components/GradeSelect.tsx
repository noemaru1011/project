import { Select } from '@/components/ui/Select/Select';
import type { Props } from '@/components/ui/Select/Select';
import { gradeOptions } from '@/features/grade/constants/gradeOptions';

type GradeSelectProps = Omit<Props, 'id' | 'options'> & { disabled?: boolean };

export const GradeSelect = ({ disabled, ...props }: GradeSelectProps) => {
  return <Select {...props} id="grade" options={gradeOptions} disabled={disabled} />;
};
