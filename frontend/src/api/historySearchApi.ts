import { Api } from './api';
import { API_ROUTES } from '@shared/routes';
import type { HistoryQuery } from '@/interface/historyQuery';
import type { HistoryResult } from '@/interface/history';

export const HistorySearchApi = {
  search: (query: HistoryQuery) =>
    Api<HistoryResult[]>(API_ROUTES.HISTORY_SEARCH, {
      method: 'POST',
      body: JSON.stringify(query),
    }),
};
