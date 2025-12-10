import { Api } from './api';
import { API_ROUTES } from '@/constants/apiRoutes';
import type { StudentQuery } from '@/interface/studentQuery';
import type { StudentResult } from '@/interface/student';

export const StudentSearchApi = {
  search: (query: StudentQuery) =>
    Api<StudentResult[]>(API_ROUTES.STUDENT.SEARCH, {
      method: 'POST',
      body: JSON.stringify(query),
    }),
};
