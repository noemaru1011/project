import { useState } from 'react';
import { Loading } from '@/components/ui/Loading/Loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  StudentSearchSection,
  HistoryCreateForm,
  SelectedStudentsFloat,
} from '@/features/history/components';
import type { HistoryForm } from '@shared/schemas/history';
import { useHistoryCreate } from '@/features/history/hooks/useHistoryCreate';
import { ROUTES } from '@/constants/routes';

export const HistoryCreatePage = () => {
  const navigate = useNavigate();
  const [selectedStudents, setSelectedStudents] = useState<{ id: string; name: string }[]>([]);
  const { createHistory, loading } = useHistoryCreate();

  const onSubmit = async (data: HistoryForm) => {
    try {
      const res = await createHistory(data);
      toast.success(res!.message);
      navigate(ROUTES.HISTORY.INDEX);
    } catch {}
  };

  return (
    <Loading loading={loading}>
      <div className="m-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StudentSearchSection
          selectedStudents={selectedStudents}
          onChangeSelected={setSelectedStudents}
        />

        <HistoryCreateForm onSubmit={onSubmit} selectedStudents={selectedStudents} />

        {selectedStudents.length > 0 && <SelectedStudentsFloat students={selectedStudents} />}
      </div>
    </Loading>
  );
};
