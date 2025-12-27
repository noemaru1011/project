import { Input } from '@/components/ui/Input/Input';
import { Clock } from 'lucide-react';

export type Props = Omit<React.ComponentProps<typeof Input>, 'type'>;

export const Datetime_localInput = ({ ...props }: Props) => {
  return <Input {...props} type="datetime-local" leftIcon={<Clock className="size-4" />} />;
};
