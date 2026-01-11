import { api } from '@/api/api';
import type { Department } from '@shared/types/department';
import { API_ROUTES } from '@shared/routes/routes';

export const departmentApi = {
  index: () => api<Department[]>(API_ROUTES.DEPARTMENT, { method: 'GET' }),
};
