import { useEffect, useState } from 'react';
import type { StudentDetail } from '@/features/student/types';
import { studentApi } from '@/features/student/';
import { useView } from '@/hooks/useView';

export const useStudentView = (studentId: string) => {
  const { view, loading } = useView<StudentDetail>(studentApi.view);
  const [student, setStudent] = useState<StudentDetail | undefined>(undefined);

  useEffect(() => {
    view(studentId).then(setStudent);
  }, [studentId]);

  return { student, loading };
};
