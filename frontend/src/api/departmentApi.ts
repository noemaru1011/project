import { Api } from './api';
import type { Department } from '@/interface/department';
import { API_ROUTES } from '@shared/routes';

export const DepartmentAPi = {
  index: () => Api<Department[]>(API_ROUTES.DEPARTMENT, { method: 'GET' }),
};
