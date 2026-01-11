import { Select } from '@/components/ui/Select/Select';
import { gradeOptions } from '@/features/grade/constants/gradeOptions';

type Props = Omit<React.ComponentProps<typeof Select>, 'options' | 'label' | 'id' | 'required'>;

export const GradeSelect = ({ ...rest }: Props) => {
  return <Select {...rest} id="grade" label="学年" required options={gradeOptions} />;
};
