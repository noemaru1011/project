import { Input } from '@/components/ui/Input/Input';
import { Clock } from 'lucide-react';
import type { Props } from '@/components/ui/Input/Input';

type StartTimeInputProps = Omit<Props, 'id' | 'type'> & { disabled?: boolean };

export const StartTimeInput = ({ disabled, ...props }: StartTimeInputProps) => {
  return (
    <Input
      {...props}
      id="startTime"
      type="datetime-local"
      leftIcon={<Clock className="size-4" />}
      disabled={disabled}
    />
  );
};
