import { api } from '@/api/api';
import { API_ROUTES } from '@shared/routes';
import type { StudentQueryForm } from '@shared/schemas/studentQuery';
import type { HistoryResult } from '@/features/history/types';

export const historySearchApi = {
  search: (query: StudentQueryForm) =>
    api<HistoryResult[]>(API_ROUTES.HISTORY_SEARCH, {
      method: 'POST',
      body: JSON.stringify(query),
    }),
};
