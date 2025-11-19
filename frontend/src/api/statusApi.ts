import { Api } from './Api';
import type { DisplayStatus } from '@/types/displayStatus';
import { API_ROUTES } from '@/constants/apiRoutes';

export const StatusAPi = {
  index: () => Api<DisplayStatus[]>(API_ROUTES.STATUS.INDEX, { method: 'GET' }),
};
