import { useCreate } from '@/hooks/api/useCreate';
import { studentApi } from '@/features/student';
import type { StudentCreateInput } from '@shared/models/student';

export const useStudentCreate = () => {
  const { create, loading } = useCreate<StudentCreateInput>(studentApi.create);

  const createStudent = (data: StudentCreateInput) => create(data);

  return { createStudent, loading };
};
