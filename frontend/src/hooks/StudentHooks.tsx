import { Hooks } from "@/hooks/Hooks";
import { StudentApi } from "@/api/studentApi";
import type { Student, StudentQuery } from "@shared/schemas/student";

export const useStudent = () => {
  return Hooks<Student, StudentQuery>(StudentApi);
};
