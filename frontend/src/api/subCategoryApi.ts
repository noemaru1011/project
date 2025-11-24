import { Api } from './api';
import type { DisplaySubCategory } from '@/types/displaySubCategory';
import { API_ROUTES } from '@/constants/apiRoutes';

export const SubCategoryApi = {
  index: () => Api<DisplaySubCategory[]>(API_ROUTES.SUBCATEGORY.INDEX, { method: 'GET' }),
};
