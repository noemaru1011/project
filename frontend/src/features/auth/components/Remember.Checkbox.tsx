import { Checkbox } from '@/components/ui/Checkbox/Checkbox';

type Props = Omit<React.ComponentProps<typeof Checkbox>, 'id' | 'label'>;

export const RememberCheckbox = ({ ...rest }: Props) => {
  return <Checkbox {...rest} id="remember" label="ログイン名を保存する" />;
};
