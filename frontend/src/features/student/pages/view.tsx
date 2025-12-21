import { Loading } from '@/components/ui/Loading/Loading';
import { StudentView } from '@/features/student/components/StudentView';
import { useStudentView } from '@/features/student/hooks/useStudentView';

export const StudentViewPage = () => {
  const { student, loading, goBack } = useStudentView();

  return (
    <Loading loading={loading}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">学生参照</h2>
          <StudentView student={student} onBack={goBack} />
        </div>
      </div>
    </Loading>
  );
};
