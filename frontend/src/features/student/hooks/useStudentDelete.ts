import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentApi } from '@/features/student';
import type { StudentDetail } from '@/features/student';
import { handleApiError } from '@/utils';
import { useDelete } from '@/hooks/useDelete';
import { useView } from '@/hooks/useView';

export const useStudentDelete = (studentId?: string) => {
  const navigate = useNavigate();
  const { remove, loading } = useDelete(studentApi.delete);
  const { view } = useView<StudentDetail>(studentApi.view);
  const [student, setStudent] = useState<StudentDetail | null>(null);

  useEffect(() => {
    if (!studentId) return;
    view(studentId)
      .then(setStudent)
      .catch((err) => handleApiError(err, navigate));
  }, [studentId, view, navigate]);

  const deleteStudent = async () => {
    if (!studentId) return;
    try {
      return await remove(studentId);
    } catch (err) {
      handleApiError(err, navigate);
    }
  };

  return { student, deleteStudent, loading };
};
