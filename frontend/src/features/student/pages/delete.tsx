import { toast } from 'react-toastify';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/routes/routes';
import { useEffect, useState } from 'react';
import type { StudentResponse } from '@shared/models/student';
import { StudentDeleteView } from '@/features/student/components/layouts/StudentDeleteView';
import { useStudentDelete } from '@/features/student/hooks/useStudentDelete';
import { useStudentView } from '@/features/student/hooks/useStudentView';
import { handleApiErrorWithUI } from '@/utils';

export const StudentDeletePage = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const { viewStudent, loading } = useStudentView();
  const { deleteStudent, loading: deleting } = useStudentDelete();
  const [student, setStudent] = useState<StudentResponse | null>(null);
  const navigate = useNavigate();

  if (!studentId) {
    return <Navigate to={ROUTES.ERROR.NOTFOUND} replace />;
  }

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await viewStudent(studentId);
        setStudent(res.data);
      } catch (err) {
        handleApiErrorWithUI(err, navigate);
      }
    };
    fetchStudent();
  }, [studentId, viewStudent, navigate]);

  const handleDelete = async () => {
    if (!student) return navigate(ROUTES.ERROR.NOTFOUND, { replace: true });
    try {
      const res = await deleteStudent(student.studentId);
      toast.success(res.message);
      navigate(ROUTES.STUDENT.INDEX);
    } catch (err) {
      handleApiErrorWithUI(err, navigate);
    }
  };

  if (loading || !student) {
    return <Loading loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">学生削除</h2>
        <StudentDeleteView
          student={student}
          onDelete={handleDelete}
          onBack={() => navigate(ROUTES.STUDENT.INDEX)}
          loading={deleting}
        />
      </div>
    </div>
  );
};
