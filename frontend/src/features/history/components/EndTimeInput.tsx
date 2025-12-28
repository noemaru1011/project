import { Datetime_localInput } from '@/components/form/Datetime-local.Input';
import { Clock } from 'lucide-react';

type Props = {
  error?: string;
  required?: boolean;
  disabled?: boolean;
} & Omit<React.ComponentProps<typeof Datetime_localInput>, 'id' | 'leftIcon' | 'helperText'>;

export const EndTimeInput = ({ disabled, ...props }: Props) => {
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
