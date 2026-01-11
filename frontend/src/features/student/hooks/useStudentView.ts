import { useEffect, useState } from 'react';
import type { StudentDetail } from '@shared/types/student';
import { studentApi } from '@/features/student/';
import { useView } from '@/hooks/api/useView';

export const useStudentView = (studentId: string) => {
  const { view, loading } = useView<StudentDetail>(studentApi.view);
  const [student, setStudent] = useState<StudentDetail | undefined>(undefined);

  useEffect(() => {
    view(studentId).then(setStudent);
  }, [studentId]);

  return { student, loading };
};
