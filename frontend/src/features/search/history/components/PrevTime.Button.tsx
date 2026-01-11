import { ChevronLeft } from 'lucide-react';

type Props = {
  disabled: boolean;
  onClick: () => void;
};

export const PrevTimeButton = ({ disabled, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-30"
      aria-label="前の時間帯"
    >
      <ChevronLeft size={24} className="text-gray-600" />
    </button>
  );
};
