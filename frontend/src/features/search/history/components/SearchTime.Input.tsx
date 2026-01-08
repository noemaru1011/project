import { Input } from '@/components/ui/Input/Input';
import { Clock } from 'lucide-react';

type Props = Omit<React.ComponentProps<typeof Input>, 'type' | 'id' | 'label' | 'leftIcon'>;

export const SearchTimeInput = ({ ...rest }: Props) => {
  return (
    <Input
      {...rest}
      id="searchTime"
      type="datetime-local"
      label="年月日検索"
      leftIcon={<Clock className="size-4" />}
    />
  );
};
