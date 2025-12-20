import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "@/components/atoms/Loading";
import { ROUTES } from "@/constants/routes";
import { StudentDeleteView } from "@/features/student/components/StudentDeleteView";
import { useStudentDelete } from "@/features/student/hooks/useStudentDelete";

export const StudentDeletePage = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { student, deleteStudent, loading } = useStudentDelete(studentId);

  const handleDelete = async () => {
    const res = await deleteStudent();
    if (res) {
      toast.success(res.message);
      navigate(ROUTES.STUDENT.INDEX);
    }
  };

  if (!student) return <Loading loading />;

  return (
    <Loading loading={loading}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            学生削除
          </h2>

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
