import { useUpdate } from '@/hooks/useUpdate';
import { studentApi } from '@/features/student';
import type { StudentUpdateForm } from '@shared/schemas/student';

export const useStudentUpdate = () => {
  const { update, loading } = useUpdate<StudentUpdateForm>(studentApi.update);

  const updateStudent = (studentId: string, data: StudentUpdateForm) => update(studentId, data);

  return { updateStudent, loading };
};
