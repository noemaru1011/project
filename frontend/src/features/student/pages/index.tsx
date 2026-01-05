import { useNavigate } from 'react-router-dom';
import { StudentSearchForm } from '@/features/search/student/components/StudentSearchForm';
import { useStudentSearch } from '@/features/search/student/hooks/useStudentSearch';
import { StudentTable } from '@/features/student/components';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/routes/routes';
import type { StudentQueryForm } from '@shared/schemas/studentQuery';

export const StudentIndexPage = () => {
  const navigate = useNavigate();
  const { data, search, loading } = useStudentSearch();

  const handleSearch = (query: StudentQueryForm) => {
    search(query);
  };

  return (
    <div className="p-4 mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center">学生一覧</h2>
      <StudentSearchForm onSearch={handleSearch} onCreate={() => navigate(ROUTES.STUDENT.CREATE)} />
      <Loading loading={loading}>
        <StudentTable data={data} actions={['Update', 'Read', 'Delete']} />
      </Loading>
    </div>
  );
};
