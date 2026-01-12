import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/routes/routes';
import { StudentUpdateForm } from '@/features/student/components/StudentUpdateForm';
import { useStudentUpdate } from '@/features/student/hooks/useStudentUpdate';
import { useStudentView } from '@/features/student/hooks/useStudentView';
import type { StudentUpdateInput } from '@shared/models/student';
import { handleApiError } from '@/utils';

export const StudentUpdatePage = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  if (!studentId) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  const { student, loading } = useStudentView(studentId);
  const { updateStudent, loading: updating } = useStudentUpdate();

  if (loading || !student) {
    return <Loading loading={loading} />;
  }
  const defaultValues: StudentUpdateInput = {
    studentName: student.studentName,
    email: student.email,
    grade: student.grade,
    minorCategoryId: student.minorCategoryId,
    departmentId: student.departmentId,
    updatedAt: student.updatedAt,
  };

  const handleSubmit = async (data: StudentUpdateInput) => {
    if (!student) return navigate(ROUTES.ERROR.NOTFOUND);
    try {
      const res = await updateStudent(student.studentId, data);
      toast.success(res.message);
      navigate(ROUTES.STUDENT.INDEX);
    } catch (err) {
      const error = handleApiError(err);
      toast.error(error.message);
      if (error.redirectTo) {
        navigate(error.redirectTo);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">学生更新</h2>
        <StudentUpdateForm
          defaultValues={defaultValues}
          loading={updating}
          onSubmit={handleSubmit}
          onBack={() => navigate(ROUTES.STUDENT.INDEX)}
        />
      </div>
    </div>
  );
};
