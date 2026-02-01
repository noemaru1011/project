import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROUTES } from '@/routes/routes';
import { StudentCreateForm } from '@/features/student/components/layouts/StudentCreateForm';
import { useCreateStudent } from '@/features/student/hooks/useCreateStudent';
import { handleApiErrorWithUI } from '@/utils';
import type { StudentCreateInput } from '@shared/models/student';

export const StudentCreatePage = () => {
  const navigate = useNavigate();
  const { createStudent, isLoading } = useCreateStudent();

  const handleSubmit = (data: StudentCreateInput) => {
    createStudent(data, {
      onSuccess: (res) => {
        toast.success(res.message);
        navigate(ROUTES.STUDENT.INDEX);
      },
      onError: (err) => {
        handleApiErrorWithUI(err, navigate);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">学生登録</h2>
        <StudentCreateForm
          onSubmit={handleSubmit}
          onBack={() => navigate(ROUTES.STUDENT.INDEX)}
          loading={isLoading}
        />
      </div>
    </div>
  );
};
