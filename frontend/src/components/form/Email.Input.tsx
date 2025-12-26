import { Input } from '@/components/ui/Input/Input';
import { Mail } from 'lucide-react';
import type { Props } from '@/components/ui/Input/Input';

type EmailInputProps = Omit<Props, 'type'>;

export const EmailInput = ({ ...props }: EmailInputProps) => {
  return <Input {...props} type="email" leftIcon={<Mail className="size-5 text-indigo-500" />} />;
};
