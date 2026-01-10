import { api } from '@/api/api';
import Cookies from 'js-cookie';
import type { LoginForm } from '@shared/schemas/login';
import { API_ROUTES } from '@shared/routes/routes';
import type { LoginResponse } from '@/features/auth/types';
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
    26|    const res = await fetch(`${API_BASE_URL}${API_ROUTES.LOG}`, {
    27|      method: 'GET',
    28|      credentials: 'include',
    29|      headers: {
    30|        'X-CSRF-Token': Cookies.get('csrf') ?? '',
    31|      },
    32|    });
    33|
    34|    if (!res.ok) {
    35|      let message = 'ログダウンロードに失敗しました';
    36|      try {
    37|        const json = await res.json();
    38|        message = json.message || message;
    39|      } catch {
    40|        // ignore
    41|      }
    42|      throw {
    43|        status: res.status,
    44|        message: message,
    45|      };
    46|    }
    47|
    48|    return await res.blob();
    49|  },
};
