import { api } from '@/api/api';
import { API_ROUTES } from '@shared/routes/routes';
import type { StudentSearchInput, StudentSummary } from '@shared/models/student';

export const studentSearchApi = {
  search: (query: StudentSearchInput) =>
    api<StudentSummary[]>(API_ROUTES.STUDENT_SEARCH, {
      method: 'POST',
      body: JSON.stringify(query),
    }),
};
