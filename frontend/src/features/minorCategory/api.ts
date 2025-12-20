import { api } from '@/api/api';
import type { minorCategory } from '@/features/minorCategory/types';
import { API_ROUTES } from '@shared/routes';

export const minorCategoryApi = {
  index: () => api<minorCategory[]>(API_ROUTES.MINOR_CATEGORY, { method: 'GET' }),
};
