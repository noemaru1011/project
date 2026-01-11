import { useState } from 'react';
import { SearchTimeInput } from '@/features/search/history/components/SearchTime.Input';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  onSearch: (query: string) => void;
  loading: boolean;
};

export const HitorySearchForm = ({ onSearch, loading }: Props) => {
  const [datetime, setDatetime] = useState(''); // 日時入力値を保持

  const formatForInput = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${y}-${m}-${d}T${h}:${min}`;
  };

  const getBaseDate = (currentStr: string) => {
    const d = new Date(currentStr);
    if (isNaN(d.getTime())) {
      const now = new Date();
      now.setHours(13, 0, 0, 0);
      return now;
    }
    return d;
  };

  const handlePrev = () => {
    const d = getBaseDate(datetime);
    const h = d.getHours();

    if (h > 13) {
      d.setHours(13, 0, 0, 0);
    } else if (h > 6) {
      d.setHours(6, 0, 0, 0);
    } else {
      d.setDate(d.getDate() - 1);
      d.setHours(22, 0, 0, 0);
    }

    const newValue = formatForInput(d);
    setDatetime(newValue);
    onSearch(newValue);
  };

  const handleNext = () => {
    const d = getBaseDate(datetime);
    const h = d.getHours();

    if (h < 6) {
      d.setHours(6, 0, 0, 0);
    } else if (h < 13) {
      d.setHours(13, 0, 0, 0);
    } else if (h < 22) {
      d.setHours(22, 0, 0, 0);
    } else {
      d.setDate(d.getDate() + 1);
      d.setHours(6, 0, 0, 0);
    }

    const newValue = formatForInput(d);
    setDatetime(newValue);
    onSearch(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDatetime(value);
    onSearch(value); // 値が変わるたびに発火
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={loading}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-30"
            aria-label="前の時間帯"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>

          <div className="flex-1">
            <SearchTimeInput disabled={loading} value={datetime} onChange={handleChange} />
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={loading}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-30"
            aria-label="次の時間帯"
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>
        </div>
      </form>
    </div>
  );
};
