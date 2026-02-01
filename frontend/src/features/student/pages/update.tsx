import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/routes/routes';
import { StudentUpdateForm } from '@/features/student/components/layouts/StudentUpdateForm';
import { useUpdateStudent } from '@/features/student/hooks/useUpdateStudent';
import { handleApiErrorWithUI } from '@/utils';
import type { StudentUpdateInput } from '@shared/models/student';

export const StudentUpdatePage = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();

  if (!studentId) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  const { student, isFetching, fetchError, updateStudent, isUpdating } =
    useUpdateStudent(studentId);

  if (fetchError) {
    handleApiErrorWithUI(fetchError, navigate);
    return null;
  }

  if (isFetching) {
    return <Loading loading />;
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
    updateStudent(data, {
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
        <h2 className="text-2xl font-bold text-gray-800 text-center">学生更新</h2>
        <StudentUpdateForm
          defaultValues={defaultValues}
          loading={isUpdating}
          onSubmit={handleSubmit}
          onBack={() => navigate(ROUTES.STUDENT.INDEX)}
        />
      </div>
    </div>
  );
};
