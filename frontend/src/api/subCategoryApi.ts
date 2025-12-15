import { Api } from './api';
import type { SubCategory } from '@/interface/subCategory';
import { API_ROUTES } from '@shared/routes';

export const SubCategoryApi = {
  index: () => Api<SubCategory[]>(API_ROUTES.SUBCATEGORY, { method: 'GET' }),
};
