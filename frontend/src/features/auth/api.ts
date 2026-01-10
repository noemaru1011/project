import { api } from '@/api/api';
import Cookies from 'js-cookie';
import type { LoginForm } from '@shared/schemas/login';
import { API_ROUTES } from '@shared/routes/routes';
import type { LoginResponse } from '@shared/loginResponse';
import type { PasswordForm } from '@shared/schemas/password';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authApi = {
  login: (data: LoginForm) =>
    api<LoginResponse>(API_ROUTES.LOGIN, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () =>
    api(API_ROUTES.LOGOUT, {
      method: 'POST',
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
      headers: {
        'X-CSRF-Token': Cookies.get('csrf') ?? '',
      },
    });

    if (!res.ok) {
      let message = 'ログダウンロードに失敗しました';
      try {
        const json = await res.json();
        message = json.message || message;
      } catch {
        // ignore
      }
      throw {
        status: res.status,
        message: message,
      };
    }

    return await res.blob();
  },
};
