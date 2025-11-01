import { Api } from "./Api";
import type { Department } from "@shared/schemas/Department";
import { ROUTES } from "@/domain/routes";

export const DepartmentAPi = {
  index: () => Api<Department[]>(ROUTES.Department.INDEX, { method: "GET" }),
};
