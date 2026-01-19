import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchTimeInput, PrevTimeButton, NextTimeButton } from '@/features/history/components';
import { HistorySearchSchema } from '@shared/models/history/schemas';
import type { HistorySearchInput } from '@shared/models/history/schemas';
import { calculatePrevTime, calculateNextTime } from '@/features/history/utils/dateUtils';

type Props = {
  onSearch: (query: string) => void;
  loading: boolean;
};
export const HistorySearchForm = ({ onSearch, loading }: Props) => {
  const { register, setValue, getValues } = useForm<HistorySearchInput>({
    resolver: zodResolver(HistorySearchSchema),
    defaultValues: { query: '' },
  });

  const handlePrev = () => {
    const newValue = calculatePrevTime(getValues('query'));
    setValue('query', newValue);
    onSearch(newValue);
  };

  const handleNext = () => {
    const newValue = calculateNextTime(getValues('query'));
    setValue('query', newValue);
    onSearch(newValue);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center gap-2">
          <PrevTimeButton onClick={handlePrev} disabled={loading} />

          <div className="flex-1">
            <SearchTimeInput
              disabled={loading}
              {...register('query', {
                onChange: (e) => onSearch(e.target.value),
              })}
            />
          </div>

          <NextTimeButton onClick={handleNext} disabled={loading} />
        </div>
      </form>
    </div>
  );
};
