import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  HistoryCreateForm,
  SelectedStudentsFloat,
  StudentTable,
} from '@/features/history/components';
import { StudentSearchForm } from '@/features/search/student/components';
import type { HistoryForm } from '@shared/schemas/history';
import { useHistoryCreate } from '@/features/history/hooks/useHistoryCreate';
import { ROUTES } from '@/routes/routes';
import { handleApiError } from '@/utils/handleApiError';
import { useStudentSearch } from '@/features/search/student/hooks/useStudentSearch';
import { Loading } from '@/components/ui/Loading/Loading';
import type { StudentQueryForm } from '@shared/schemas/studentQuery';

export const HistoryCreatePage = () => {
  const navigate = useNavigate();
  const [selectedStudents, setSelectedStudents] = useState<{ id: string; name: string }[]>([]);
  const { createHistory, loading: creating } = useHistoryCreate();
  const { searchStudents, data, loading: searching } = useStudentSearch();

  const onSubmit = async (data: HistoryForm) => {
    try {
      const res = await createHistory(data);
      toast.success(res.message);
      navigate(ROUTES.HISTORY.INDEX);
    } catch (err) {
      const error = handleApiError(err);
      toast.error(error.message);
      if (error.redirectTo) {
        navigate(error.redirectTo);
      }
    }
  };

  const handleSearch = async (query: StudentQueryForm) => {
    try {
      const res = await searchStudents(query);
      toast.info(res.message);
    } catch (err) {
      const error = handleApiError(err);
      toast.error(error.message);
      if (error.redirectTo) {
        navigate(error.redirectTo);
      }
    }
  };

  return (
    <>
      <h2 className="text-center text-2xl font-bold mt-4">履歴作成</h2>
      <div className="m-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <StudentSearchForm onSearch={handleSearch} loading={searching} />

          <Loading loading={searching}>
            <StudentTable
              data={data}
              selectedStudents={selectedStudents}
              onChangeSelected={setSelectedStudents}
            />
          </Loading>
        </div>

        <HistoryCreateForm
          onSubmit={onSubmit}
          loading={creating}
          selectedStudents={selectedStudents}
        />

        {selectedStudents.length > 0 && <SelectedStudentsFloat students={selectedStudents} />}
      </div>
    </>
  );
};
