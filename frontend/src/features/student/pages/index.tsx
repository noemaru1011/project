import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StudentSearchForm } from '@/features/search/student/components/layouts/StudentSearchForm';
import { useStudentSearch } from '@/features/search/student/hooks/useStudentSearch';
import { StudentTable } from '@/features/student/components';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/routes/routes';
import { handleApiError } from '@/utils';
import type { StudentSearchInput } from '@shared/models/student';

export const StudentIndexPage = () => {
  const navigate = useNavigate();
  const { data, searchStudents, loading } = useStudentSearch();

  const handleSearch = async (query: StudentSearchInput) => {
    try {
      const res = await searchStudents(query);
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
      <h2 className="text-2xl font-bold text-gray-800 text-center">学生一覧</h2>
      <StudentSearchForm
        onSearch={handleSearch}
        loading={loading}
        onCreate={() => navigate(ROUTES.STUDENT.CREATE)}
      />
      <Loading loading={loading}>
        <StudentTable data={data} actions={['Update', 'Read', 'Delete']} />
      </Loading>
    </div>
  );
};
