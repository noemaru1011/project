import { studentApi } from '@/features/student';
import { useDelete } from '@/hooks/useDelete';

export const useStudentDelete = () => {
  const { remove, loading } = useDelete(studentApi.delete);

  const deleteStudent = (studentId: string) => remove(studentId);

  return { deleteStudent, loading };
};
