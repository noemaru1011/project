import { api } from '@/api/api';
import { API_ROUTES } from '@shared/routes/routes';
import type { StudentQueryForm } from '@shared/schemas/studentQuery';
import type { HistorySummary } from '@shared/types/history';

export const historySearchApi = {
  search: (query: StudentQueryForm) =>
    api<HistorySummary[]>(API_ROUTES.HISTORY_SEARCH, {
      method: 'POST',
      body: JSON.stringify(query),
    }),

  searchByTime: (datetime: string) =>
    api<any>(`${API_ROUTES.HISTORY_SEARCH}?datetime=${encodeURIComponent(datetime)}`, {
      method: 'GET',
    }),
};
