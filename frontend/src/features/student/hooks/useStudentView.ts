import type { StudentResponse } from '@shared/models/student';
import { studentApi } from '@/features/student/';
import { useView } from '@/hooks/api/useView';

export const useStudentView = () => {
  const { view, loading } = useView<StudentResponse>(studentApi.view);

  const viewStudent = (studentId: string) => view(studentId);

  return { viewStudent, loading };
};
