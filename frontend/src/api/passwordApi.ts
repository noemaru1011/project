import { Api } from './api';
import type { Password } from '@shared/schemas/password';
import { API_ROUTES } from '@/constants/apiRoutes';

export const PasswordApi = {
  update: (data: Password) =>
    Api(API_ROUTES.PASSWORD.UPDATE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
