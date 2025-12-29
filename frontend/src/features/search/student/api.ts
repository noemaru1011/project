import { api } from '@/api/api';
import { API_ROUTES } from '@shared/routes';
import type { StudentQueryForm } from '@shared/schemas/studentQuery';
import type { StudentResult } from '@/features/student/types';

export const studentSearchApi = {
  search: (query: StudentQueryForm) =>
    api<StudentResult[]>(API_ROUTES.STUDENT_SEARCH, {
      method: 'POST',
      body: JSON.stringify(query),
    }),
};
