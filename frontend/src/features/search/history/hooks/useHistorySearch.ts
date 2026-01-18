import { historySearchApi } from '@/features/search/history/api';
import type { HistorySummary } from '@shared/models/history';
import type { StudentSearchInput } from '@shared/models/student';
import { useSearch } from '@/hooks/api/useSearch';

export const useHistorySearch = () => {
  const { search, loading } = useSearch<HistorySummary, StudentSearchInput>(
    historySearchApi.search,
  );

  const searchHistories = (data: StudentSearchInput) => search(data);

  return { searchHistories, loading };
};
