import { api } from '@/api/api';
import type { HistoryForm, HistoryUpdateForm } from '@shared/schemas/history';
import type { HistoryDetail } from '@/features/history/types';
import { API_ROUTES } from '@shared/routes/routes';

export const historyApi = {
  create: (data: HistoryForm) =>
    api<void>(API_ROUTES.HISTORY, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: HistoryUpdateForm) =>
    api<void>(`${API_ROUTES.HISTORY}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  view: (id: string) => api<HistoryDetail>(`${API_ROUTES.HISTORY}/${id}`, { method: 'GET' }),

  delete: (id: string) => api<void>(`${API_ROUTES.HISTORY}/${id}`, { method: 'DELETE' }),
};
