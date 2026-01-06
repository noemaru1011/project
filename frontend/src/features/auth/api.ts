import { api } from '@/api/api';
import type { LoginForm } from '@shared/schemas/login';
import { API_ROUTES } from '@shared/routes/routes';
import type { LoginResponse } from '@/features/auth/types';
import type { PasswordForm } from '@shared/schemas/password';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

  logDownload: async (): Promise<Blob> => {
    const res = await fetch(`${API_BASE_URL}${API_ROUTES.LOG}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('ログダウンロードに失敗しました');
    }

    return await res.blob();
  },
};
