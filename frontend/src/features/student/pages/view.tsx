import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/routes/routes';
import { StudentView } from '@/features/student/components/layouts/StudentDetailView';
import { studentApi } from '@/features/student';
import { handleApiErrorWithUI } from '@/utils';

export const StudentViewPage = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();

  const { data: response, isLoading } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => studentApi.view(studentId!),
    enabled: !!studentId,
    meta: {
      onError: (err: any) => handleApiErrorWithUI(err, navigate),
    },
  });

  const student = response?.data;

  if (!studentId) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  if (isLoading) {
    return <Loading loading={isLoading} />;
  }

  if (!student) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">学生参照</h2>
        <StudentView student={student} onBack={() => navigate(ROUTES.STUDENT.INDEX)} />
      </div>
    </div>
  );
};
