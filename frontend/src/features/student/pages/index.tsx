import { studentSearchApi } from '@/features/search/student/api';
import type { StudentResult } from '@/features/student/types';
import type { StudentQuery } from '@/features/search/student/types';
import { useSearch } from '@/hooks/useSearch';
import { StudentSearchPanel } from '@/features/search/student/components/StudentSearchForm';
import { StudentTable } from '@/features/student/components';

export const StudentIndexPage = () => {
  const { data, loading, search } = useSearch<StudentResult, StudentQuery>(studentSearchApi.search);

  return (
    <div className="p-4 mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center">学生一覧</h2>
      <StudentSearchPanel onSearch={search} />
      <StudentTable data={data} loading={loading} />
    </div>
  );
};
