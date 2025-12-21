import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading } from '@/components/atoms/Loading';
import { ROUTES } from '@/constants/routes';
import { useView } from '@/hooks/useView';
import { StudentUpdateForm } from '@/features/student/components/StudentUpdateForm';
import { useStudentUpdate } from '@/features/student/hooks/useStudentUpdate';
import type { StudentDetail } from '@/features/student/types';
import type { StudentUpdateForm as FormType } from '@shared/schemas/student';
import { studentApi } from '@/features/student';
import { handleApiError } from '@/utils/handleApiError';

export const StudentUpdatePage = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { view } = useView<StudentDetail>(studentApi.view);
  const { updateStudent, loading } = useStudentUpdate();
  const [defaultValues, setDefaultValues] = useState<FormType | null>(null);

  useEffect(() => {
    if (!studentId) return;
    view(studentId)
      .then((data) =>
        setDefaultValues({
          studentName: data.studentName,
          email: data.email,
          grade: data.grade,
          minorCategoryId: data.minorCategoryId,
          departmentId: data.departmentId,
          updatedAt: new Date(data.updatedAt),
        }),
      )
      .catch((err) => handleApiError(err, navigate));
  }, []);

  const handleSubmit = async (data: FormType) => {
    if (!studentId) return;
    const res = await updateStudent(studentId, data);
    toast.success(res.message);
    navigate(ROUTES.STUDENT.INDEX);
  };

  if (!defaultValues) return <Loading loading />;

  return (
    <Loading loading={loading}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-center">学生更新</h2>
          <StudentUpdateForm
            defaultValues={defaultValues}
            loading={loading}
            onSubmit={handleSubmit}
            onBack={() => navigate(ROUTES.STUDENT.INDEX)}
          />
        </div>
      </div>
    </Loading>
  );
};
