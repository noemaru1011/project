import { Api } from './api';
import type { HistoryForm, HistoryUpdateForm } from '@shared/schemas/history';
import type { HistoryDetail } from '@/interface/history';
import { API_ROUTES } from '@shared/routes';

export const HistoryApi = {
  create: (data: HistoryForm) =>
    Api<void>(API_ROUTES.HISTORY, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: HistoryUpdateForm) =>
    Api<void>(`${API_ROUTES.HISTORY}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  view: (id: string) => Api<HistoryDetail>(`${API_ROUTES.HISTORY}/${id}`, { method: 'GET' }),

  delete: (id: string) => Api<void>(`${API_ROUTES.HISTORY}/${id}`, { method: 'DELETE' }),
};
