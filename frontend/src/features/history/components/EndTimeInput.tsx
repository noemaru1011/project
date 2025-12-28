import { Input } from '@/components/ui/Input/Input';
import { Clock } from 'lucide-react';

type Props = Omit<
  React.ComponentProps<typeof Input>,
  'type' | 'id' | 'label' | 'leftIcon' | 'helperText'
>;

export const EndTimeInput = ({ ...props }: Props) => {
  return (
    <Input
      {...props}
      id="endTime"
      label="有効終了日"
      leftIcon={<Clock className="size-4" />}
      helperText="未定の場合は時間を設定しないでください。"
    />
  );
};
