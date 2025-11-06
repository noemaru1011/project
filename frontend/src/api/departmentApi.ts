import { Api } from "./Api";
import type { Department } from "@shared/schemas/Department";
import { API_ROUTES } from "@/constants/apiRoutes";

export const DepartmentAPi = {
  index: () =>
    Api<Department[]>(API_ROUTES.DEPARTMENT.INDEX, { method: "GET" }),
};
