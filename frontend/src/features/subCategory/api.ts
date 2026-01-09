import { api } from '@/api/api';
import type { SubCategory } from '@/features/subCategory';
import { API_ROUTES } from '@shared/routes/routes';

export const subCategoryApi = {
  index: () => api<SubCategory[]>(API_ROUTES.SUBCATEGORY, { method: 'GET' }),
};
