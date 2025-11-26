import { Api } from './api';
import type { LoginForm } from '@shared/schemas/login';
import { API_ROUTES } from '@/constants/apiRoutes';

export interface LoginResponseData {
  token: string;
  role: string;
  passwordUpdateRequired: boolean;
}

export const LoginApi = {
  login: (data: LoginForm) =>
    Api<LoginResponseData>(API_ROUTES.AUTH.LOGIN, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    }),
};
