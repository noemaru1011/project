import { Input } from '@/components/ui/Input/Input';
import { User } from 'lucide-react';
import type { Props } from '@/components/ui/Input/Input';

type StudentNameInputProps = Omit<Props, 'id' | 'type'> & { disabled?: boolean };

export const StudentNameInput = ({ disabled, ...props }: StudentNameInputProps) => {
  return (
    <Input
      {...props}
      id="studentName"
      type="text"
      leftIcon={<User className="size-4" />}
      disabled={disabled}
    />
  );
};
