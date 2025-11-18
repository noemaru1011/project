import { Api } from './Api';
import type { Student, StudentQuery } from '@shared/schemas/student';
import { API_ROUTES } from '@/constants/apiRoutes';

export const StudentApi = {
  index: () => Api<Student[]>(API_ROUTES.STUDENT.INDEX, { method: 'GET' }),

  search: (data: StudentQuery) =>
    Api<any>(API_ROUTES.STUDENT.SEARCH, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  create: (data: Partial<Student>) =>
    Api<Student>(API_ROUTES.STUDENT.CREATE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<Student>) =>
    Api<Student>(API_ROUTES.STUDENT.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    Api<void>(API_ROUTES.STUDENT.DELETE(id), {
      method: 'DELETE',
    }),

  view: (id: string) => Api<Student>(API_ROUTES.STUDENT.VIEW(id), { method: 'GET' }),
};
