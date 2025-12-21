import { api } from './api';
import { API_ROUTES } from '@shared/routes';
import type { HistoryQuery } from '@/features/search/history/types';
import type { HistoryResult } from '@/features/history/types';

export const HistorySearchApi = {
  search: (query: HistoryQuery) =>
    api<HistoryResult[]>(API_ROUTES.HISTORY_SEARCH, {
      method: 'POST',
      body: JSON.stringify(query),
    }),
};
