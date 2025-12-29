import { historySearchApi } from '@/features/search/history';
import type { HistoryResult } from '@/features/history/types';
import type { HistoryQuery } from '@/features/search/history/types';
import { useSearch } from '@/hooks/useSearch';
import { StudentSearchForm } from '@/features/search/student/components/StudentSearchForm';
import { HistoryTable } from '@/features/history/components';

export const HistoryIndexPage = () => {
  const { data, loading, search } = useSearch<HistoryResult, HistoryQuery>(historySearchApi.search);

  return (
    <div className="p-4 mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center">履歴一覧</h2>
      <StudentSearchForm onSearch={search} />
      <HistoryTable data={data} loading={loading} />
    </div>
  );
};
