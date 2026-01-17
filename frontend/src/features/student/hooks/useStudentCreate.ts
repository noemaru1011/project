import { useCreate } from '@/hooks/api/useCreate';
import { studentApi } from '@/features/student';
import type { StudentCreateInput, StudentResponse } from '@shared/models/student';

export const useStudentCreate = () => {
  const { create, loading } = useCreate<StudentCreateInput, StudentResponse>(studentApi.create);

  const createStudent = (data: StudentCreateInput) => create(data);

  return { createStudent, loading };
};
