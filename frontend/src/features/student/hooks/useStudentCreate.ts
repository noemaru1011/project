import { useCreate } from '@/hooks/useCreate';
import { studentApi } from '@/features/student';
import type { StudentForm } from '@shared/schemas/student';

export const useStudentCreate = () => {
  const { create, loading } = useCreate<StudentForm>(studentApi.create);

  const createStudent = (data: StudentForm) =>  create(data);

  return { createStudent, loading };
};
