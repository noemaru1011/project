import { useUpdate } from '@/hooks/api/useUpdate';
import { studentApi } from '@/features/student';
import type { StudentUpdateInput, StudentResponse } from '@shared/models/student';

export const useStudentUpdate = () => {
  const { update, loading } = useUpdate<StudentUpdateInput, StudentResponse>(studentApi.update);

  const updateStudent = (studentId: string, data: StudentUpdateInput) => update(studentId, data);

  return { updateStudent, loading };
};
