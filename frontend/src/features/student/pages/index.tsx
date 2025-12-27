import { studentSearchApi } from '@/features/search/student/api';
import { useNavigate } from 'react-router-dom';
import type { StudentResult } from '@/features/student/types';
import type { StudentQuery } from '@/features/search/student/types';
import { useSearch } from '@/hooks/useSearch';
import { StudentSearchPanel } from '@/features/search/student/components/StudentSearchForm';
import { StudentTable } from '@/features/student/components';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/constants/routes';

export const StudentIndexPage = () => {
  const navigate = useNavigate();
  const { data, loading, search } = useSearch<StudentResult, StudentQuery>(studentSearchApi.search);

  return (
    <div className="p-4 mx-auto max-w-4xl">
      <Loading loading={loading}>
        <h2 className="text-2xl font-bold text-gray-800 text-center">学生一覧</h2>
        <StudentSearchPanel onSearch={search} onCreate={() => navigate(ROUTES.STUDENT.CREATE)} />
        <StudentTable data={data} actions={['Update', 'Read', 'Delete']} />
      </Loading>
    </div>
  );
};
