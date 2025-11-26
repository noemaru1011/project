import { Api } from './api';
import { API_ROUTES } from '@/constants/apiRoutes';
import type { StudentQuery } from '@/interface/studentQuery';
import type { StudentForSearch } from '@/interface/student';

export const StudentSearchApi = {
  search: (query: StudentQuery) =>
    Api<StudentForSearch[]>(API_ROUTES.STUDENT.SEARCH, {
      method: 'POST',
      body: JSON.stringify(query),
    }),
};
