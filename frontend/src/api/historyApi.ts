import { Api } from './api';
import type { HistoryForm } from '@shared/schemas/history';
import type { HistoryResult } from '@/interface/history';
import { API_ROUTES } from '@/constants/apiRoutes';

export const HistoryApi = {
  create: (data: HistoryForm) =>
    Api<void>(API_ROUTES.HISTORY.CREATE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: HistoryForm) =>
    Api<void>(API_ROUTES.HISTORY.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  view: (id: string) => Api<HistoryResult>(API_ROUTES.HISTORY.VIEW(id), { method: 'GET' }),

  delete: (id: string) =>
    Api<void>(API_ROUTES.HISTORY.DELETE(id), {
      method: 'DELETE',
    }),
};
