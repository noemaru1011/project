import { Api } from './api';
import type { Login } from '@shared/schemas/login';
import { API_ROUTES } from '@/constants/apiRoutes';

export interface LoginResponseData {
  token: string;
  role: string;
  passwordUpdateRequired: boolean;
}

export const LoginApi = {
  login: (data: Login) =>
    Api<LoginResponseData>(API_ROUTES.AUTH.LOGIN, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    }),
};
