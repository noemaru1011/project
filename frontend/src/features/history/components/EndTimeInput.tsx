import { Input } from '@/components/ui/Input/Input';
import { Clock } from 'lucide-react';
import type { Props } from '@/components/ui/Input/Input';

type EndTimeInputProps = Omit<Props, 'id' | 'type'> & { disabled?: boolean };

export const EndTimeInput = ({ disabled, ...props }: EndTimeInputProps) => {
  return (
    <Input
      {...props}
      id="endTime"
      type="datetime-local"
      leftIcon={<Clock className="size-4" />}
      helperText="未定の場合は時間を設定しないでください。"
      disabled={disabled}
    />
  );
};
