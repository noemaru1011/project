import { Api } from '@/api/api';
import type { Category } from '@/features/category/types';
import { API_ROUTES } from '@shared/routes';

export const categoryApi = {
  index: () => Api<Category[]>(API_ROUTES.CATEGORY, { method: 'GET' }),
};
