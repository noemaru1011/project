import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';

type Props = Omit<
  React.ComponentProps<typeof Button>,
  'type' | 'className' | 'aria-label' | 'children' | 'variant'
>;

export const PrevTimeButton = ({ ...rest }: Props) => {
  return (
    <Button
      {...rest}
      type="button"
      className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-30"
      aria-label="前の時間帯"
    >
      <ChevronLeft size={24} className="text-gray-600" />
    </Button>
  );
};
