import { toast } from 'react-toastify';
import type { StudentSearchInput } from '@shared/models/student';
import { StudentSearchForm } from '@/features/search/student/components/layouts/StudentSearchForm';
import { useHistorySearch } from '@/features/search/history/hooks/useHistorySearch';
import { handleApiErrorWithUI } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { HistoryTable } from '@/features/history/components';
import { HitorySearchForm, AggregationDashboard } from '@/features/search/history/components/';
import { useHistorySearchByTime } from '@/features/search/history/hooks/useHistorySearchByTime';

export const HistoryIndexPage = () => {
  const navigate = useNavigate();
  const { data, searchHistories, loading } = useHistorySearch();
  const {
    data: aggregationData,
    searchHistoriesByTime,
    loading: timeSearching,
  } = useHistorySearchByTime();

  const handleSearch = async (query: StudentSearchInput) => {
    try {
      const res = await searchHistories(query);
      toast.info(res.message);
    } catch (err) {
      handleApiErrorWithUI(err, navigate);
    }
  };

  const handleTimeSearch = async (query: string) => {
    try {
      const res = await searchHistoriesByTime(query);
      toast.info(res.message);
    } catch (err) {
      handleApiErrorWithUI(err, navigate);
    }
  };

  return (
    <div className="p-4 mx-auto max-w-6xl px-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">履歴一覧</h2>

      <div className="space-y-10">
        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">時間帯別集計検索</h3>
          <HitorySearchForm onSearch={handleTimeSearch} loading={timeSearching} />
          {aggregationData && <AggregationDashboard data={aggregationData} />}
        </section>

        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">履歴検索</h3>
          <StudentSearchForm onSearch={handleSearch} loading={loading} />
          <div className="mt-6">
            <HistoryTable data={data} loading={loading} />
          </div>
        </section>
      </div>
    </div>
  );
};
