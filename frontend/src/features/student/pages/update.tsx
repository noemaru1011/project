import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/constants/routes';
import { StudentUpdateForm } from '@/features/student/components/StudentUpdateForm';
import { useStudentUpdate } from '@/features/student/hooks/useStudentUpdate';
import { useStudentView } from '@/features/student/hooks/useStudentView';
import type { StudentUpdateForm as FormType } from '@shared/schemas/student';

export const StudentUpdatePage = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();

  const { student, loading } = useStudentView(studentId);
  const { updateStudent, loading: updating } = useStudentUpdate();

  if (!student) {
    return <Loading loading={loading} />;
  }
  const defaultValues: FormType = {
    studentName: student.studentName,
    email: student.email,
    grade: student.grade,
    minorCategoryId: student.minorCategoryId,
    departmentId: student.departmentId,
    updatedAt: new Date(student.updatedAt),
  };

  const handleSubmit = async (data: FormType) => {
    if (!student) return;
    const res = await updateStudent(student.studentId, data);
    toast.success(res!.message);
    navigate(ROUTES.STUDENT.INDEX);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">学生登録</h2>
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
