import { api } from '@/api/api';
import type { Status } from '@/features/status';
import { API_ROUTES } from '@shared/routes/routes';

export const statusApi = {
  index: () => api<Status[]>(API_ROUTES.STATUS, { method: 'GET', credentials: 'include' }),
};
