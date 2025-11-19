import { Api } from './Api';
import type { DisplayMinorCategory } from '@/types/displayMinorCategory';
import { API_ROUTES } from '@/constants/apiRoutes';

export const MinorCategoryApi = {
  index: () => Api<DisplayMinorCategory[]>(API_ROUTES.MINORCATEGORY.INDEX, { method: 'GET' }),
};
