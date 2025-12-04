import { Api } from './api';
import type { HistoryForm } from '@shared/schemas/history';
import type { History } from '@/interface/history';
import { API_ROUTES } from '@/constants/apiRoutes';

export const HistoryApi = {
  index: () => Api<History[]>(API_ROUTES.HISTORY.INDEX, { method: 'GET' }),

  create: (data: HistoryForm) =>
    Api<void>(API_ROUTES.HISTORY.CREATE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
