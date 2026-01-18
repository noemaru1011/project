import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { StudentSearchForm } from '@/features/search/student/components/layouts/StudentSearchForm';
import { useStudentSearch } from '@/features/search/student/hooks/useStudentSearch';
import { StudentTable } from '@/features/student/components';
import { ROUTES } from '@/routes/routes';
import { handleApiErrorWithUI } from '@/utils';
import type { StudentSearchInput, StudentSummary } from '@shared/models/student';

export const StudentIndexPage = () => {
  const navigate = useNavigate();
  const { searchStudents, loading } = useStudentSearch();
  const [student, setStudent] = useState<StudentSummary[] | null>(null);

  const handleSearch = async (query: StudentSearchInput) => {
    try {
      const res = await searchStudents(query);
      setStudent(res.data);
      toast.info(res.message);
    } catch (err) {
      handleApiErrorWithUI(err, navigate);
    }
  };

  return (
    <div className="p-4 mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center">学生一覧</h2>
      <StudentSearchForm
        onSearch={handleSearch}
        loading={loading}
        onCreate={() => navigate(ROUTES.STUDENT.CREATE)}
      />
      <StudentTable loading={loading} data={student ?? []} actions={['Update', 'Read', 'Delete']} />
    </div>
  );
};
