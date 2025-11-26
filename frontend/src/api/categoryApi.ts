import { Api } from './api';
import type { Category } from '@/interface/category';
import { API_ROUTES } from '@/constants/apiRoutes';

export const CategoryApi = {
  index: () => Api<Category[]>(API_ROUTES.CATEGORY.INDEX, { method: 'GET' }),
};
