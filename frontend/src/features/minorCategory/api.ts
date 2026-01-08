import { api } from '@/api/api';
import type { MinorCategory } from '@/features/minorCategory';
import { API_ROUTES } from '@shared/routes/routes';

export const minorCategoryApi = {
  index: () =>
    api<MinorCategory[]>(API_ROUTES.MINOR_CATEGORY, { method: 'GET', credentials: 'include' }),
};
