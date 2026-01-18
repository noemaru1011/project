import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/routes/routes';
import { StudentUpdateForm } from '@/features/student/components/layouts/StudentUpdateForm';
import { studentApi } from '@/features/student';
import type { StudentUpdateInput } from '@shared/models/student';
import { handleApiErrorWithUI } from '@/utils';

export const StudentUpdatePage = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const queryClient = useQueryClient();

  const { data: response, isLoading: isFetching } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => studentApi.view(studentId!),
    enabled: !!studentId,
    meta: {
      onError: (err: any) => handleApiErrorWithUI(err, navigate),
    },
  });

  const student = response?.data;

  const updateMutation = useMutation({
    mutationFn: (data: StudentUpdateInput) => studentApi.update(studentId!, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['student', studentId] });

      toast.success(res.message);
      navigate(ROUTES.STUDENT.INDEX);
    },
    onError: (err) => handleApiErrorWithUI(err, navigate),
  });

  if (!studentId) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  if (isFetching) {
    return <Loading loading={isFetching} />;
  }

  if (!student) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }
  const defaultValues: StudentUpdateInput = {
    studentName: student.studentName,
    email: student.email,
    grade: student.grade,
    minorCategoryId: student.minorCategoryId,
    departmentId: student.departmentId,
    updatedAt: student.updatedAt,
  };

  const handleSubmit = (data: StudentUpdateInput) => {
    updateMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">学生更新</h2>
        <StudentUpdateForm
          defaultValues={defaultValues}
          loading={updateMutation.isPending}
          onSubmit={handleSubmit}
          onBack={() => navigate(ROUTES.STUDENT.INDEX)}
        />
      </div>
    </div>
  );
};
