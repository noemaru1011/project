import { api } from '@/api/api';
import type {
  HistoryCreateInput,
  HistoryUpdateInput,
  HistoryResponse,
} from '@shared/models/history';
import { API_ROUTES } from '@shared/routes/routes';

export const historyApi = {
  create: (data: HistoryCreateInput) =>
    api<void>(API_ROUTES.HISTORY, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: HistoryUpdateInput) =>
    api<void>(`${API_ROUTES.HISTORY}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  view: (id: string) => api<HistoryResponse>(`${API_ROUTES.HISTORY}/${id}`, { method: 'GET' }),

  delete: (id: string) => api<void>(`${API_ROUTES.HISTORY}/${id}`, { method: 'DELETE' }),
};
