import { Api } from './api';
import { API_ROUTES } from '@/constants/apiRoutes';
import type { HistoryQuery } from '@/interface/historyQuery';
import type { HistoryResult } from '@/interface/history';

export const HistorySearchApi = {
  search: (query: HistoryQuery) =>
    Api<HistoryResult[]>(API_ROUTES.HISTORY.SEARCH, {
      method: 'POST',
      body: JSON.stringify(query),
    }),
};
