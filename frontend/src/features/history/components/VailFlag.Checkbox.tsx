import { Checkbox } from '@/components/ui/Checkbox/Checkbox';

type Props = Omit<React.ComponentProps<typeof Checkbox>, 'id' | 'label'>;

export const VailFlagCheckbox = ({ ...props }: Props) => {
  return <Checkbox {...props} id="validFlag" label="有効フラグ" />;
};
