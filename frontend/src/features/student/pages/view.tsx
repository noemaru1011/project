import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/routes/routes';
import { StudentView } from '@/features/student/components/layouts/StudentDetailView';
import { useStudentView } from '@/features/student/hooks/useStudentView';
import { useEffect, useState } from 'react';
import type { StudentResponse } from '@shared/models/student';
import { handleApiErrorWithUI } from '@/utils';

export const StudentViewPage = () => {
  const navigate = useNavigate();
  const { viewStudent, loading } = useStudentView();
  const { studentId } = useParams<{ studentId: string }>();
  const [student, setStudent] = useState<StudentResponse | null>(null);

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
  }, []);

  if (loading || !student) {
    return <Loading loading={loading} />;
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
