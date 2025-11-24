import { Api } from './api';
import type { DisplayDepartment } from '@/types/displayDepartment';
import { API_ROUTES } from '@/constants/apiRoutes';

export const DepartmentAPi = {
  index: () => Api<DisplayDepartment[]>(API_ROUTES.DEPARTMENT.INDEX, { method: 'GET' }),
};
