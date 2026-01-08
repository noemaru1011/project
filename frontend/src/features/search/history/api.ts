import { api } from '@/api/api';
import { API_ROUTES } from '@shared/routes/routes';
import type { StudentQueryForm } from '@shared/schemas/studentQuery';
import type { HistoryResult } from '@/features/history/types';

export const historySearchApi = {
  search: (query: StudentQueryForm) =>
    api<HistoryResult[]>(API_ROUTES.HISTORY_SEARCH, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(query),
    }),

  searchByTime: (datetime: string) =>
    api<any>(`${API_ROUTES.HISTORY_SEARCH}?datetime=${encodeURIComponent(datetime)}`, {
      method: 'GET',
      credentials: 'include',
    }),
};
