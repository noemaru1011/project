import { Button } from '@/components/ui/Button/Button';
import { ChevronRight } from 'lucide-react';

type Props = Omit<
  React.ComponentProps<typeof Button>,
  'type' | 'className' | 'aria-label' | 'children' | 'variant'
>;

export const NextTimeButton = ({ ...rest }: Props) => {
  return (
    <Button
      {...rest}
      type="button"
      className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-30"
      aria-label="次の時間帯"
    >
      <ChevronRight size={24} className="text-gray-600" />
    </Button>
  );
};
