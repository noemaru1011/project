import { Api } from './api';
import type { DisplayPassword } from '@/types/displayPassword';
import { API_ROUTES } from '@/constants/apiRoutes';

export const PasswordApi = {
  update: (data: DisplayPassword) =>
    Api(API_ROUTES.PASSWORD.UPDATE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
