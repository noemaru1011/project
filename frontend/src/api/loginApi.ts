import { Api } from './Api';
import type { DisplayLogin } from '@/types/displayLogin';
import { API_ROUTES } from '@/constants/apiRoutes';

export const LoginApi = {
  login: (data: DisplayLogin) =>
    Api<DisplayLogin>(API_ROUTES.AUTH.LOGIN, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    }),
};
