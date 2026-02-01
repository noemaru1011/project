import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StudentSearchForm } from '@/features/student/components/layouts/StudentSearchForm';
import { StudentTable } from '@/features/student/components';
import { ROUTES } from '@/routes/routes';
import { useSearchStudents } from '@/features/student/hooks/useSearchStudents';
import { useDeleteStudent } from '@/features/student/hooks/useDeleteStudent';
import { handleApiErrorWithUI } from '@/utils';
import { APIMESSAGE } from '@shared/constants/apiMessage';

export const StudentIndexPage = () => {
  const navigate = useNavigate();
  const { students, search, isLoading, isFetching } = useSearchStudents();

  const { deleteStudent, isDeleting } = useDeleteStudent();

  const handleDelete = async (id: string) => {
    if (!window.confirm('本当に削除しますか？')) return;

    try {
      await deleteStudent(id);
      toast.success(APIMESSAGE.DELETE_SUCCESS);
    } catch (err) {
      handleApiErrorWithUI(err, navigate);
    }
  };

  return (
    <div className="p-4 mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center">学生一覧</h2>
      <StudentSearchForm
        onSearch={search}
        loading={isLoading || isFetching}
        onCreate={() => navigate(ROUTES.STUDENT.CREATE)}
      />
      <StudentTable
        loading={isLoading || isFetching || isDeleting}
        data={students}
        actions={['Update', 'Read', 'Delete']}
        onDelete={handleDelete}
      />
    </div>
  );
};
