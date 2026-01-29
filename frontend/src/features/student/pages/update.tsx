import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/routes/routes';
import { StudentUpdateForm } from '@/features/student/components/layouts/StudentUpdateForm';
import { useUpdateStudent } from '@/features/student/hooks/useUpdateStudent';

export const StudentUpdatePage = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();

  if (!studentId) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  const { student, defaultValues, isFetching, updateStudent, isUpdating } =
    useUpdateStudent(studentId);

  if (isFetching) {
    return <Loading loading />;
  }

  if (!student || !defaultValues) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">学生更新</h2>
        <StudentUpdateForm
          defaultValues={defaultValues}
          loading={isUpdating}
          onSubmit={updateStudent}
          onBack={() => navigate(ROUTES.STUDENT.INDEX)}
        />
      </div>
    </div>
  );
};
