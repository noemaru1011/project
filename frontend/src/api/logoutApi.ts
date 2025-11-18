import { Api } from './Api';
import { API_ROUTES } from '@/constants/apiRoutes';

interface LogoutResponse {
  message: string;
}

export const LogoutApi = {
  logout: () =>
    Api<LogoutResponse>(API_ROUTES.AUTH.LOGOUT, {
      method: 'POST',
      credentials: 'include',
    }),
};
