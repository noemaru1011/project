import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/routes/routes';
import { StudentDeleteView } from '@/features/student/components/layouts/StudentDeleteView';
import { useDeleteStudent } from '@/features/student/hooks/useDeleteStudent';

export const StudentDeletePage = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();

  if (!studentId) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  const { student, isFetching, deleteStudent, isDeleting } = useDeleteStudent(studentId);

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
          onDelete={deleteStudent}
          onBack={() => navigate(ROUTES.STUDENT.INDEX)}
          loading={isDeleting}
        />
      </div>
    </div>
  );
};
