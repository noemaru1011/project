import { historySearchApi } from '@/features/search/history/api';
import type { HistorySummary } from '@shared/types/history';
import type { StudentQueryForm } from '@shared/schemas/studentQuery';
import { useSearch } from '@/hooks/api/useSearch';

export const useHistorySearch = () => {
  const { data, search, loading } = useSearch<HistorySummary, StudentQueryForm>(
    historySearchApi.search,
  );

  const searchHistories = (data: StudentQueryForm) => search(data);

  return { data, searchHistories, loading };
};
