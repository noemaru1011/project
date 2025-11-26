import { Api } from './api';
import type { Department } from '@/interface/department';
import { API_ROUTES } from '@/constants/apiRoutes';

export const DepartmentAPi = {
  index: () => Api<Department[]>(API_ROUTES.DEPARTMENT.INDEX, { method: 'GET' }),
};
