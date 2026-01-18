import type { HistoryResponse } from '@shared/models/history';
import { historyApi } from '@/features/history';
import { useView } from '@/hooks/api/useView';

export const useHistoryView = () => {
  const { view, loading } = useView<HistoryResponse>(historyApi.view);

  const viewHistory = (historyId: string) => view(historyId);

  return { viewHistory, loading };
};
