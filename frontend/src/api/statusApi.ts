import { Api } from './api';
import type { Status } from '@/interface/status';
import { API_ROUTES } from '@shared/routes';

export const StatusAPi = {
  index: () => Api<Status[]>(API_ROUTES.STATUS, { method: 'GET' }),
};
