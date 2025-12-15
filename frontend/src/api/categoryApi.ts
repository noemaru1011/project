import { Api } from './api';
import type { Category } from '@/interface/category';
import { API_ROUTES } from '@shared/routes';

export const CategoryApi = {
  index: () => Api<Category[]>(API_ROUTES.CATEGORY, { method: 'GET' }),
};
