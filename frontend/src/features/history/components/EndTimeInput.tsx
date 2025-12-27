import { Datetime_localInput } from '@/components/form/Datetime-local.Input';
import { Clock } from 'lucide-react';
import type { Datetime_localInputProps } from '@/components/form/Datetime-local.Input';

type EndTimeInputProps = Omit<Datetime_localInputProps, 'type'> & { disabled?: boolean };

export const EndTimeInput = ({ disabled, ...props }: EndTimeInputProps) => {
  return (
    <Datetime_localInput
      {...props}
      id="endTime"
      leftIcon={<Clock className="size-4" />}
      helperText="未定の場合は時間を設定しないでください。"
      disabled={disabled}
    />
  );
};
