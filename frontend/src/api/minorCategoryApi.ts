import { Api } from './api';
import type { MinorCategory } from '@/interface/minorCategory';
import { API_ROUTES } from '@shared/routes';

export const MinorCategoryApi = {
  index: () => Api<MinorCategory[]>(API_ROUTES.MINOR_CATEGORY, { method: 'GET' }),
};
