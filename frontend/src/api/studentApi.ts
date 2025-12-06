import { Api } from './api';
import type { StudentInput } from '@/schemas/student.Input';
import type { Student } from '@/interface/student';
import type { StudentDetail } from '@/interface/student';
import { API_ROUTES } from '@/constants/apiRoutes';

export const StudentApi = {
  index: () => Api<Student[]>(API_ROUTES.STUDENT.INDEX, { method: 'GET' }),

  create: (data: StudentInput) =>
    Api<void>(API_ROUTES.STUDENT.CREATE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: StudentInput) =>
    Api<void>(API_ROUTES.STUDENT.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    Api<void>(API_ROUTES.STUDENT.DELETE(id), {
      method: 'DELETE',
    }),

  view: (id: string) => Api<StudentDetail>(API_ROUTES.STUDENT.VIEW(id), { method: 'GET' }),
};
