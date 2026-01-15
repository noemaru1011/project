import { ChevronRight } from 'lucide-react';

type Props = {
  disabled: boolean;
  onClick: () => void;
};

export const NextTimeButton = ({ disabled, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-30"
      aria-label="次の時間帯"
    >
      <ChevronRight size={24} className="text-gray-600" />
    </button>
  );
};
