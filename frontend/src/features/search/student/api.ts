import { api } from '@/api/api';
import { API_ROUTES } from '@shared/routes';
import type { StudentQuery } from '@/features/search/student/types';
import type { StudentResult } from '@/features/student/types';

export const StudentSearchApi = {
  search: (query: StudentQuery) =>
    api<StudentResult[]>(API_ROUTES.STUDENT_SEARCH, {
      method: 'POST',
      body: JSON.stringify(query),
    }),
};
