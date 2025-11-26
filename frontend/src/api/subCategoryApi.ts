import { Api } from './api';
import type { SubCategory } from '@/interface/subCategory';
import { API_ROUTES } from '@/constants/apiRoutes';

export const SubCategoryApi = {
  index: () => Api<SubCategory[]>(API_ROUTES.SUBCATEGORY.INDEX, { method: 'GET' }),
};
