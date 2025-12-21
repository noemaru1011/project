import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { StudentDetail } from '@/features/student/types';
import { studentApi } from '@/features/student/';
import { handleApiError } from '@/utils';
import { useView } from '@/hooks/useView';
import { ROUTES } from '@/constants/routes';

export const useStudentView = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { view, loading } = useView<StudentDetail>(studentApi.view);
  const [student, setStudent] = useState<StudentDetail | null>(null);

  useEffect(() => {
    if (!studentId) return;

    const fetchStudent = async () => {
      try {
        const data = await view(studentId);
        setStudent(data);
      } catch (err) {
        handleApiError(err, navigate);
      }
    };

    fetchStudent();
  }, [studentId]);

  return {
    student,
    loading,
    goBack: () => navigate(ROUTES.STUDENT.INDEX),
  };
};
