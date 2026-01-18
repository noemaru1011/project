import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/routes/routes';
import { StudentDeleteView } from '@/features/student/components/layouts/StudentDeleteView';
import { studentApi } from '@/features/student';
import { handleApiErrorWithUI } from '@/utils';

export const StudentDeletePage = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
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

  const deleteMutation = useMutation({
    mutationFn: (id: string) => studentApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('削除に成功しました。');
      navigate(ROUTES.STUDENT.INDEX);
    },
    onError: (err) => handleApiErrorWithUI(err, navigate),
  });

  if (!studentId) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  if (isFetching) {
    return <Loading loading />;
  }

  if (!student) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">学生削除</h2>
        <StudentDeleteView
          student={student}
          onDelete={() => deleteMutation.mutate(student.studentId)}
          onBack={() => navigate(ROUTES.STUDENT.INDEX)}
          loading={deleteMutation.isPending}
        />
      </div>
    </div>
  );
};
