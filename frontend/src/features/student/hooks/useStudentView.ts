import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { StudentDetail } from '@/features/student/types';
import { studentApi } from '@/features/student/';
import { handleApiError } from '@/utils';
import { useView } from '@/hooks/useView';

export const useStudentView = (studentId?: string) => {
  const navigate = useNavigate();
  const { view, loading } = useView<StudentDetail>(studentApi.view);
  const [student, setStudent] = useState<StudentDetail | null>(null);

  useEffect(() => {
    if (!studentId) return;

    view(studentId)
      .then(setStudent)
      .catch((err) => handleApiError(err, navigate));
  }, [studentId]);

  return { student, loading };
};
