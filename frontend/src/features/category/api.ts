import { api } from '@/api/api';
import type { Category } from '@shared/models/master';
import { API_ROUTES } from '@shared/routes/routes';

export const categoryApi = {
  index: () => api<Category[]>(API_ROUTES.CATEGORY, { method: 'GET' }),
};
