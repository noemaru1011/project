import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/constants/routes';
import { StudentUpdateForm } from '@/features/student/components/StudentUpdateForm';
import { useStudentUpdate } from '@/features/student/hooks/useStudentUpdate';
import { useStudentView } from '@/features/student/hooks/useStudentView';
import type { StudentUpdateForm as FormType } from '@shared/schemas/student';
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
  const defaultValues: FormType = {
    studentName: student.studentName,
    email: student.email,
    grade: student.grade.toString(),
    minorCategoryId: student.minorCategoryId.toString(),
    departmentId: student.departmentId.toString(),
    updatedAt: student.updatedAt.toString(),
  };

  const handleSubmit = async (data: FormType) => {
    if (!student) return;
    try {
      const res = await updateStudent(student.studentId, data);
      toast.success(res!.message);
      navigate(ROUTES.STUDENT.INDEX);
    } catch (err) {
      handleApiError(err, navigate);
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
