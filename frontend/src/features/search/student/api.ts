import { api } from '@/api/api';
import { API_ROUTES } from '@shared/routes/routes';
import type { StudentQueryForm } from '@shared/schemas/studentQuery';
import type { StudentSummary } from '@shared/types/student';

export const studentSearchApi = {
  search: (query: StudentQueryForm) =>
    api<StudentSummary[]>(API_ROUTES.STUDENT_SEARCH, {
      method: 'POST',
      body: JSON.stringify(query),
    }),
};
