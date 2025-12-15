import { Api } from './api';
import { API_ROUTES } from '@shared/routes';

export const LogoutApi = {
  logout: () =>
    Api(API_ROUTES.LOGOUT, {
      method: 'POST',
      credentials: 'include',
    }),
};
