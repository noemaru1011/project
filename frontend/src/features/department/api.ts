import { api } from '@/api/api';
import type { Department } from '@/features/department/types';
import { API_ROUTES } from '@shared/routes';

export const departmentApi = {
  index: () => api<Department[]>(API_ROUTES.DEPARTMENT, { method: 'GET' }),
};
