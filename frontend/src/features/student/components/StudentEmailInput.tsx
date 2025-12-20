import { Input } from '@/components/atoms/Input';
import { Mail } from 'lucide-react';
import type { Props } from '@/components/atoms/Input';

type StudentEmailInputProps = Omit<Props, 'id' | 'type'>;

export const StudentEmailInput = ({ disabled, ...props }: StudentEmailInputProps) => {
  return <Input {...props} id="studentEmail" type="email" leftIcon={<Mail className="size-4" />} />;
};
