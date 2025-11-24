import { Api } from './api';
import type { DisplayLogin } from '@/types/displayLogin';
import { API_ROUTES } from '@/constants/apiRoutes';

export type LoginResponseData = {
  token: string;
  role: string;
  passwordUpdateRequired: boolean;
};

export const LoginApi = {
  login: (data: DisplayLogin) =>
    Api<LoginResponseData>(API_ROUTES.AUTH.LOGIN, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    }),
};
