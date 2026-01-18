import { api } from '@/api/api';
import Cookies from 'js-cookie';
import { API_ROUTES } from '@shared/routes/routes';
import type { LoginInput, LoginResponse, PasswordUpdateInput } from '@shared/models/auth';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

  logDownload: async (): Promise<Blob> => {
    const res = await fetch(`${API_BASE_URL}${API_ROUTES.LOG}`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
