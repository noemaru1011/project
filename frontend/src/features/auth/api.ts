import { api } from '@/api/api';
import type { LoginForm } from '@shared/schemas/login';
import { API_ROUTES } from '@shared/routes';
import type { LoginResponse } from '@/features/auth/types';
import type { PasswordForm } from '@shared/schemas/password';

export const authApi = {
  login: (data: LoginForm) =>
    api<LoginResponse>(API_ROUTES.LOGIN, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    }),

  logout: () =>
    api(API_ROUTES.LOGOUT, {
      method: 'POST',
      credentials: 'include',
    }),

  updatePassword: (data: PasswordForm) =>
    api(API_ROUTES.PASSWORD, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
