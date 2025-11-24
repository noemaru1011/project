import { Api } from './api';
import type { DisplayCategory } from '@/types/displayCategory';
import { API_ROUTES } from '@/constants/apiRoutes';

export const CategoryApi = {
  index: () => Api<DisplayCategory[]>(API_ROUTES.CATEGORY.INDEX, { method: 'GET' }),
};
