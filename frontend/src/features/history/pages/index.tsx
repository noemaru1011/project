import { toast } from 'react-toastify';
import type { StudentQueryForm } from '@shared/schemas/studentQuery';
import { StudentSearchForm } from '@/features/search/student/components/StudentSearchForm';
import { useHistorySearch } from '@/features/search/history/hooks/useHistorySearch';
import { handleApiError } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { HistoryTable } from '@/features/history/components';
import { HitorySearchForm } from '@/features/search/history/components/HitorySearchForm';
import { useHistorySearchByTime } from '@/features/search/history/hooks/useHistorySearchByTime';

export const HistoryIndexPage = () => {
  const navigate = useNavigate();
  const { data, searchHistories, loading } = useHistorySearch();
  const { searchHistoriesByTime, loading: timeSearching } = useHistorySearchByTime();

  const handleSearch = async (query: StudentQueryForm) => {
    try {
      const res = await searchHistories(query);
      toast.info(res.message);
    } catch (err) {
      const error = handleApiError(err);
      toast.error(error.message);
      if (error.redirectTo) {
        navigate(error.redirectTo);
      }
    }
  };

  const handleTimeSearch = async (query: string) => {
    try {
      const res = await searchHistoriesByTime(query);
      toast.info(res.message);
    } catch (err) {
      const error = handleApiError(err);
      toast.error(error.message);
      if (error.redirectTo) {
        navigate(error.redirectTo);
      }
    }
  };

  return (
    <div className="p-4 mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center">履歴一覧</h2>
      <HitorySearchForm onSearch={handleTimeSearch} loading={timeSearching} />
      <StudentSearchForm onSearch={handleSearch} loading={loading} />
      <HistoryTable data={data} loading={loading} />
    </div>
  );
};
