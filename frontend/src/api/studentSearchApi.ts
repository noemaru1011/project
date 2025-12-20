import { Api } from './api';
import { API_ROUTES } from '@shared/routes';
import type { StudentQuery } from '@/interface/studentQuery';
import type { StudentResult } from '@/features/student/types';

export const StudentSearchApi = {
  search: (query: StudentQuery) =>
    Api<StudentResult[]>(API_ROUTES.STUDENT_SEARCH, {
      method: 'POST',
      body: JSON.stringify(query),
    }),
};
