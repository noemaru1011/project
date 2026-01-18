import { api } from '@/api/api';
import { API_ROUTES } from '@shared/routes/routes';
import type { StudentSearchInput } from '@shared/models/student';
import type { HistorySummary, AggregationData } from '@shared/models/history';

export const historySearchApi = {
  search: (query: StudentSearchInput) =>
    api<HistorySummary[]>(API_ROUTES.HISTORY_SEARCH, {
      method: 'POST',
      body: JSON.stringify(query),
    }),

  searchByTime: (datetime: string) =>
    api<AggregationData>(`${API_ROUTES.HISTORY_SEARCH}?datetime=${encodeURIComponent(datetime)}`, {
      method: 'GET',
    }),
};
