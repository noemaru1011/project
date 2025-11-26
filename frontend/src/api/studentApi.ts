import { Api } from './api';
// import type { StudentQuery } from '@shared/schemas/student';
import type { Student } from '@/interface/student';
import type { DisplayStudent } from '@/types/displayStudent';
import { API_ROUTES } from '@/constants/apiRoutes';

export const StudentApi = {
  index: () => Api<Student[]>(API_ROUTES.STUDENT.INDEX, { method: 'GET' }),

  search: (data: any) =>
    Api<Student[]>(API_ROUTES.STUDENT.SEARCH, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  create: (data: Partial<DisplayStudent>) =>
    Api<Student>(API_ROUTES.STUDENT.CREATE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<DisplayStudent>) =>
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
