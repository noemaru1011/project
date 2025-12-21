import { Input } from '@/components/ui/Input/Input';
import { Mail } from 'lucide-react';
import type { Props } from '@/components/ui/Input/Input';

type EmailInputProps = Omit<Props, 'id' | 'type'>;

export const EmailInput = ({ disabled, ...props }: EmailInputProps) => {
  return (
    <Input
      {...props}
      id="email"
      type="email"
      leftIcon={<Mail className="size-5 text-indigo-500" />}
      required
    />
  );
};
