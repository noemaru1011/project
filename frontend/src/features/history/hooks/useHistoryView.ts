import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { HistoryDetail } from '@/features/history';
import { historyApi } from '@/features/history';
import { handleApiError } from '@/utils';
import { useView } from '@/hooks/useView';

export const useHistoryView = (historyId?: string) => {
  const navigate = useNavigate();
  const { view, loading } = useView<HistoryDetail>(historyApi.view);
  const [history, setHistory] = useState<HistoryDetail | null>(null);

  useEffect(() => {
    if (!historyId) return;

    view(historyId)
      .then(setHistory)
      .catch((err) => handleApiError(err, navigate));
  }, [historyId]);

  return { history, loading };
};
