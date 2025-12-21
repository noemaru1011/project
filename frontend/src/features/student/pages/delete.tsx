import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '@/components/ui/Loading/Loading';
import { ROUTES } from '@/constants/routes';
import { StudentDeleteView } from '@/features/student/components/StudentDeleteView';
import { useStudentDelete } from '@/features/student/hooks/useStudentDelete';
import { useStudentView } from '@/features/student/hooks/useStudentView';

export const StudentDeletePage = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const { student, loading } = useStudentView(studentId);
  const { deleteStudent, loading: deleting } = useStudentDelete();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!student) return;
    const res = await deleteStudent(student.studentId);
    toast.success(res!.message);
    navigate(ROUTES.STUDENT.INDEX);
  };

  if (loading || !student) {
    return <Loading loading />;
  }

  return (
    <Loading loading={deleting}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">学生削除</h2>
          <StudentDeleteView
            student={student}
            onDelete={handleDelete}
            onBack={() => navigate(ROUTES.STUDENT.INDEX)}
          />
        </div>
      </div>
    </Loading>
  );
};
