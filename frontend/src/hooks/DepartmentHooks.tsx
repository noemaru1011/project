import { Hooks } from "@/hooks/Hooks";
import { DepartmentAPi } from "@/api/departmentApi";
import type { Department } from "@shared/schemas/Department";

export function useDepartment(autoFetch: boolean) {
  return Hooks<Department>(DepartmentAPi, autoFetch);
}
