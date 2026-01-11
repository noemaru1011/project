import { CheckboxGroup } from '@/components/ui/CheckboxGroup/CheckboxGroup';
import { gradeOptions } from '@/features/grade/constants/gradeOptions';

type Props = Omit<React.ComponentProps<typeof CheckboxGroup>, 'options' | 'label' | 'column'>;

export const GradeCheckboxGroup = ({ ...rest }: Props) => {
  return <CheckboxGroup {...rest} options={gradeOptions} label="学年" column={4} />;
};
