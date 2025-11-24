import { Api } from './api';
import { API_ROUTES } from '@/constants/apiRoutes';

export const LogoutApi = {
  logout: () =>
    Api(API_ROUTES.AUTH.LOGOUT, {
      method: 'POST',
      credentials: 'include',
    }),
};
