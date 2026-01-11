import { api } from '@/api/api';
import type { Status } from '@shared/types/status';
import { API_ROUTES } from '@shared/routes/routes';

export const statusApi = {
  index: () => api<Status[]>(API_ROUTES.STATUS, { method: 'GET' }),
};
