import { Input } from '@/components/ui/Input/Input';
import { Clock } from 'lucide-react';

type Props = Omit<
  React.ComponentProps<typeof Input>,
  'type' | 'id' | 'leftIcon' | 'label' | 'required'
>;

export const StartTimeInput = ({ ...rest }: Props) => {
  return (
    <Input
      {...rest}
      id="startTime"
      label="有効開始日"
      type="datetime-local"
      required
      leftIcon={<Clock className="size-4" />}
    />
  );
};
