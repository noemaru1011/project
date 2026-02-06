import { api } from '@/api/api';
import { API_ROUTES } from '@shared/routes/routes';
import type { LoginInput, LoginResponse, PasswordUpdateInput } from '@shared/models/auth';

export const authApi = {
  login: (data: LoginInput) =>
    api<LoginResponse>(API_ROUTES.LOGIN, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () =>
    api(API_ROUTES.LOGOUT, {
      method: 'POST',
    }),

  updatePassword: (data: PasswordUpdateInput) =>
    api(API_ROUTES.PASSWORD, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
