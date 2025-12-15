import { Api } from './api';
import type { LoginForm } from '@shared/schemas/login';
import { API_ROUTES } from '@shared/routes';
import type { LoginResponse } from '@/interface/loginResponse';

export const LoginApi = {
  login: (data: LoginForm) =>
    Api<LoginResponse>(API_ROUTES.LOGIN, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    }),
};
