import { useEffect, useState } from 'react';
import type { StudentResponse } from '@shared/models/student';
import { studentApi } from '@/features/student/';
import { useView } from '@/hooks/api/useView';

export const useStudentView = (studentId: string) => {
  const { view, loading } = useView<StudentResponse>(studentApi.view);
  const [student, setStudent] = useState<StudentResponse | undefined>(undefined);

  useEffect(() => {
    view(studentId).then(setStudent);
  }, [studentId]);

  return { student, loading };
};
