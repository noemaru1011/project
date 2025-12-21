import { Input } from '@/components/ui/Input/Input';
import { Mail } from 'lucide-react';
import type { Props } from '@/components/ui/Input/Input';

type StudentEmailInputProps = Omit<Props, 'id' | 'type'> & { disabled?: boolean };

export const StudentEmailInput = ({ disabled, ...props }: StudentEmailInputProps) => {
  return (
    <Input
      {...props}
      id="studentEmail"
      type="email"
      leftIcon={<Mail className="size-4" />}
      disabled={disabled}
    />
  );
};
