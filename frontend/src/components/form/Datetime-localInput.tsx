import { Input } from '@/components/ui/Input/Input';
import { Clock } from 'lucide-react';
import type { Props } from '@/components/ui/Input/Input';

type EndTimeInputProps = Omit<Props, 'type'> & { disabled?: boolean };

export const EndTimeInput = ({ disabled, ...props }: EndTimeInputProps) => {
  return <Input {...props} type="datetime-local" leftIcon={<Clock className="size-4" />} />;
};
