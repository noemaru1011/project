import { Api } from './Api';
import type { Password } from '@shared/schemas/password';
import { API_ROUTES } from '@/constants/apiRoutes';

export const PasswordApi = {
  update: (data: Partial<Password>) =>
    Api<Password>(API_ROUTES.PASSWORD.UPDATE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
