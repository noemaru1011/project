import { Hooks } from "@/hooks/Hooks";
import { StudentApi } from "@/api/studentApi";
import type { Student, StudentQuery } from "@shared/schemas/Student";

export const useStudent = () => {
  return Hooks<Student, StudentQuery>(StudentApi);
};
