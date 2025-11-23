import { Api } from './Api';
import type { StudentQuery } from '@shared/schemas/student';
import type { DisplayStudent } from '@/types/displayStudent';
import { API_ROUTES } from '@/constants/apiRoutes';

export const StudentApi = {
  index: () => Api<DisplayStudent[]>(API_ROUTES.STUDENT.INDEX, { method: 'GET' }),

  search: (data: StudentQuery) =>
    Api<DisplayStudent[]>(API_ROUTES.STUDENT.SEARCH, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  create: (data: Partial<DisplayStudent>) =>
    Api<DisplayStudent>(API_ROUTES.STUDENT.CREATE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<DisplayStudent>) =>
    Api<DisplayStudent>(API_ROUTES.STUDENT.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    Api<void>(API_ROUTES.STUDENT.DELETE(id), {
      method: 'DELETE',
    }),

  view: (id: string) => Api<DisplayStudent>(API_ROUTES.STUDENT.VIEW(id), { method: 'GET' }),
};
