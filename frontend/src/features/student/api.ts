import { api } from '@/api/api';
import type {
  StudentCreateInput,
  StudentUpdateInput,
  StudentResponse,
  StudentSearchInput,
  StudentSummary,
} from '@shared/models/student';
import type { PaginatedResponse } from '@shared/models/common';
import { API_ROUTES } from '@shared/routes/routes';

export const studentApi = {
  create: (data: StudentCreateInput) =>
    api<StudentResponse>(API_ROUTES.STUDENT, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: StudentUpdateInput) =>
    api<StudentResponse>(`${API_ROUTES.STUDENT}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    api<void>(`${API_ROUTES.STUDENT}/${id}`, {
      method: 'DELETE',
    }),

  view: (id: string) => api<StudentResponse>(`${API_ROUTES.STUDENT}/${id}`, { method: 'GET' }),

  search: (query: StudentSearchInput) =>
    api<PaginatedResponse<StudentSummary>>(API_ROUTES.STUDENT_SEARCH, {
      method: 'POST',
      body: JSON.stringify(query),
    }),
};
