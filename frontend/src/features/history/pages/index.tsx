import type { StudentQueryForm } from '@shared/schemas/studentQuery';
import { StudentSearchForm } from '@/features/search/student/components/StudentSearchForm';
import { useHistorySearch } from '@/features/search/history/hooks/useHistorySearch';

import { HistoryTable } from '@/features/history/components';

export const HistoryIndexPage = () => {
  const { data, search, loading } = useHistorySearch();
  const handleSearch = (query: StudentQueryForm) => {
    search(query); // useStudentSearch 内の search 関数を呼ぶ
  };

  return (
    <div className="p-4 mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center">履歴一覧</h2>
      <StudentSearchForm onSearch={handleSearch} />
      <HistoryTable data={data} loading={loading} />
    </div>
  );
};
