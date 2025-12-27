import { TextInput } from '@/components/form/Text.Input';
import { User } from 'lucide-react';
import type { TextInputProps } from '@/components/form/Text.Input';

type StudentNameInputProps = Omit<TextInputProps, 'type'> & { disabled?: boolean };

export const StudentNameInput = ({ disabled, ...props }: StudentNameInputProps) => {
  return (
    <TextInput
      {...props}
      id="studnetName"
      label="学生名"
      leftIcon={<User className="size-4" />}
      disabled={disabled}
    />
  );
};
