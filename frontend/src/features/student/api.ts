import { api } from '@/api/api';
import type { StudentForm, StudentUpdateForm } from '@shared/schemas/student';
import type { StudentDetail } from '@/features/student/types';
import { API_ROUTES } from '@shared/routes/routes';

export const studentApi = {
  create: (data: StudentForm) =>
    api<void>(API_ROUTES.STUDENT, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: StudentUpdateForm) =>
    api<void>(`${API_ROUTES.STUDENT}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    api<void>(`${API_ROUTES.STUDENT}/${id}`, {
      method: 'DELETE',
    }),

  view: (id: string) => api<StudentDetail>(`${API_ROUTES.STUDENT}/${id}`, { method: 'GET' }),
};
