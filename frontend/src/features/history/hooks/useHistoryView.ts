import { useEffect, useState } from 'react';
import type { HistoryDetail } from '@/features/history';
import { historyApi } from '@/features/history';
import { useView } from '@/hooks/useView';

export const useHistoryView = (historyId: string) => {
  const { view, loading } = useView<HistoryDetail>(historyApi.view);
  const [history, setHistory] = useState<HistoryDetail | null>(null);

  useEffect(() => {
    view(historyId).then(setHistory);
  }, [historyId]);

  return { history, loading };
};
