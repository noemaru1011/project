import { useNavigate } from 'react-router-dom';
import { StudentSearchForm } from '@/features/student/components/layouts/StudentSearchForm';
import { StudentTable } from '@/features/student/components';
import { ROUTES } from '@/routes/routes';
import { useSearchStudents } from '@/features/student/hooks/useSearchStudents';

export const StudentIndexPage = () => {
  const navigate = useNavigate();

  const { students, search, isLoading, isFetching } = useSearchStudents();

  return (
    <div className="p-4 mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center">学生一覧</h2>
      <StudentSearchForm
        onSearch={search}
        loading={isLoading || isFetching}
        onCreate={() => navigate(ROUTES.STUDENT.CREATE)}
      />
      <StudentTable
        loading={isLoading || isFetching}
        data={students}
        actions={['Update', 'Read', 'Delete']}
      />
    </div>
  );
};
