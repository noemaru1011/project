import { Api } from './Api';
import type { Auth } from '@shared/schemas/login';
import { API_ROUTES } from '@/constants/apiRoutes';

export const LoginApi = {
  login: (data: Partial<Auth>) =>
    Api<Auth>(API_ROUTES.AUTH.LOGIN, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    }),
};
