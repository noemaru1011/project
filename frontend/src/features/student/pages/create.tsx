import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routes';
import { StudentCreateForm } from '@/features/student/components/layouts/StudentCreateForm';
import { studentApi } from '@/features/student';
import type { StudentCreateInput } from '@shared/models/student';
import { handleApiErrorWithUI } from '@/utils';

export const StudentCreatePage = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: StudentCreateInput) => studentApi.create(data),
    onSuccess: (res) => {
      toast.success(res.message);
      navigate(ROUTES.STUDENT.INDEX);
    },
    onError: (err) => {
      handleApiErrorWithUI(err, navigate);
    },
  });

  const onSubmit = (data: StudentCreateInput) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">学生登録</h2>
        <StudentCreateForm
          onSubmit={onSubmit}
          onBack={() => navigate(ROUTES.STUDENT.INDEX)}
          loading={mutation.isPending}
        />
      </div>
    </div>
  );
};
