import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { historyApi } from '@/features/history';
import type { HistoryDetail } from '@/features/history';
import { handleApiError } from '@/utils';
import { useDelete } from '@/hooks/useDelete';
import { useView } from '@/hooks/useView';

export const useHistoryDelete = (historyId?: string) => {
  const navigate = useNavigate();
  const { remove, loading } = useDelete(historyApi.delete);
  const { view } = useView<HistoryDetail>(historyApi.view);
  const [history, setStudent] = useState<HistoryDetail | null>(null);

  useEffect(() => {
    if (!historyId) return;
    view(historyId)
      .then(setStudent)
      .catch((err) => handleApiError(err, navigate));
  }, [historyId, view, navigate]);

  const deleteStudent = async () => {
    if (!historyId) return;
    try {
      return await remove(historyId);
    } catch (err) {
      handleApiError(err, navigate);
    }
  };

  return { history, deleteStudent, loading };
};
