import { Checkbox } from '@/components/ui/Checkbox/Checkbox';

type Props = Omit<React.ComponentProps<typeof Checkbox>, 'id' | 'label'>;

export const VailFlagCheckbox = ({ ...rest }: Props) => {
  return <Checkbox {...rest} id="validFlag" label="有効フラグ" />;
};
