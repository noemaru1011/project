import { Api } from './api';
import type { PasswordForm } from '@shared/schemas/password';
import { API_ROUTES } from '@shared/routes';

export const PasswordApi = {
  update: (data: PasswordForm) =>
    Api(API_ROUTES.PASSWORD, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
