import { Input } from '@/components/ui/Input/Input';
import { Mail } from 'lucide-react';

export type Props = Omit<React.ComponentProps<typeof Input>, 'type'>;

export const EmailInput = ({ ...props }: Props) => {
  return <Input {...props} type="email" leftIcon={<Mail className="size-5 text-indigo-500" />} />;
};
