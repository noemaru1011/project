import { api } from '@/api/api';
import type {
  HistoryCreateInput,
  HistoryUpdateInput,
  HistoryResponse,
  HistorySummary,
  AggregationData,
} from '@shared/models/history';
import type { StudentSearchInput } from '@shared/models/student';
import { API_ROUTES } from '@shared/routes/routes';

export const historyApi = {
  create: (data: HistoryCreateInput) =>
    api<HistoryResponse>(API_ROUTES.HISTORY, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: HistoryUpdateInput) =>
    api<HistoryResponse>(`${API_ROUTES.HISTORY}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  view: (id: string) => api<HistoryResponse>(`${API_ROUTES.HISTORY}/${id}`, { method: 'GET' }),

  delete: (id: string) => api<void>(`${API_ROUTES.HISTORY}/${id}`, { method: 'DELETE' }),

  search: (query: StudentSearchInput) =>
    api<HistorySummary[]>(API_ROUTES.HISTORY_SEARCH, {
      method: 'POST',
      body: JSON.stringify(query),
    }),

  searchByTime: (datetime: string) =>
    api<AggregationData>(`${API_ROUTES.HISTORY_SEARCH}?datetime=${encodeURIComponent(datetime)}`, {
      method: 'GET',
    }),
};
