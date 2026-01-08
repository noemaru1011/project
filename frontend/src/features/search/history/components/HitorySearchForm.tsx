import { useState } from 'react';
import { SearchTimeInput } from '@/features/search/history/components/SearchTime.Input';

type Props = {
  onSearch: (query: string) => void;
  loading: boolean;
};

export const HitorySearchForm = ({ onSearch, loading }: Props) => {
  const [datetime, setDatetime] = useState(''); // 日時入力値を保持

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDatetime(value);
    onSearch(value); // 値が変わるたびに発火
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form className="flex flex-col gap-4">
        <SearchTimeInput disabled={loading} value={datetime} onChange={handleChange} />
      </form>
    </div>
  );
};
