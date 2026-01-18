import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  HistoryCreateForm,
  SelectedStudentsFloat,
  StudentTable,
} from '@/features/history/components';
import { StudentSearchForm } from '@/features/search/student/components';
import type { HistoryCreateInput } from '@shared/models/history';
import { useHistoryCreate } from '@/features/history/hooks/useHistoryCreate';
import { ROUTES } from '@/routes/routes';
import { handleApiErrorWithUI } from '@/utils/handleApiError';
import { useStudentSearch } from '@/features/search/student/hooks/useStudentSearch';
import type { StudentSearchInput, StudentSummary } from '@shared/models/student';

export const HistoryCreatePage = () => {
  const navigate = useNavigate();
  const [selectedStudents, setSelectedStudents] = useState<{ id: string; name: string }[]>([]);
  const { createHistory, loading: creating } = useHistoryCreate();
  const { searchStudents, loading: searching } = useStudentSearch();
  const [student, setStudent] = useState<StudentSummary[] | null>(null);

  const onSubmit = async (data: HistoryCreateInput) => {
    try {
      const res = await createHistory(data);
      toast.success(res.message);
      navigate(ROUTES.HISTORY.INDEX);
    } catch (err) {
      handleApiErrorWithUI(err, navigate);
    }
  };

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
    <div className="m-4">
      <h2 className="text-center text-2xl font-bold mt-4">履歴作成</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        {/* 左カラム */}
        <div>
          <StudentSearchForm onSearch={handleSearch} loading={searching} />

          <StudentTable
            loading={searching}
            data={student ?? []}
            selectedStudents={selectedStudents}
            onChangeSelected={setSelectedStudents}
          />
        </div>

        {/* 右カラム（sticky） */}
        <div className="sticky top-4 self-start">
          <HistoryCreateForm
            onSubmit={onSubmit}
            loading={creating}
            selectedStudents={selectedStudents}
          />
        </div>
      </div>

      {selectedStudents.length > 0 && <SelectedStudentsFloat students={selectedStudents} />}
    </div>
  );
};
