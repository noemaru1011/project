import { Input } from '@/components/ui/Input/Input';
import { User } from 'lucide-react';

type Props = Omit<
  React.ComponentProps<typeof Input>,
  'type' | 'id' | 'label' | 'leftIcon' | 'required'
>;

export const StudentNameInput = ({ ...rest }: Props) => {
  return (
    <Input
      {...rest}
      type="text"
      id="studnetName"
      label="学生名"
      required
      leftIcon={<User className="size-4" />}
    />
  );
};
