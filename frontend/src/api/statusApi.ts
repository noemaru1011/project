import { Api } from './api';
import type { Status } from '@/interface/status';
import { API_ROUTES } from '@/constants/apiRoutes';

export const StatusAPi = {
  index: () => Api<Status[]>(API_ROUTES.STATUS.INDEX, { method: 'GET' }),
};
