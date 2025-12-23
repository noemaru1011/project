import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/constants/routes';
import { StudentCreateForm } from '@/features/student/components/StudentCreateForm';
import { useStudentCreate } from '@/features/student/hooks/useStudentCreate';
import type { StudentForm } from '@shared/schemas/student';
import { handleApiError } from '@/utils';

export const StudentCreatePage = () => {
  const navigate = useNavigate();
  const { createStudent, loading } = useStudentCreate();

  const onSubmit = async (data: StudentForm) => {
    try {
      const res = await createStudent(data);
      toast.success(res!.message);
      navigate(ROUTES.STUDENT.INDEX);
    } catch (err){
      handleApiError(err, navigate);
    }
  };

  return (
    <Loading loading={loading}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">学生登録</h2>
          <StudentCreateForm
            onSubmit={onSubmit}
            onBack={() => navigate(ROUTES.STUDENT.INDEX)}
            loading={loading}
          />
        </div>
      </div>
    </Loading>
  );
};
