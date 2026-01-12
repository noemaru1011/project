import { useEffect, useState } from 'react';
import type { HistoryResponse } from '@shared/models/history';
import { historyApi } from '@/features/history';
import { useView } from '@/hooks/api/useView';

export const useHistoryView = (historyId: string) => {
  const { view, loading } = useView<HistoryResponse>(historyApi.view);
  const [history, setHistory] = useState<HistoryResponse | null>(null);

  useEffect(() => {
    view(historyId).then(setHistory);
  }, [historyId]);

  return { history, loading };
};
