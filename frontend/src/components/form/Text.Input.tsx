import { Input } from '@/components/ui/Input/Input';

type Props = Omit<React.ComponentProps<typeof Input>, 'type'>;

export const TextInput = ({ ...props }: Props) => {
  return <Input {...props} type="text" />;
};
