import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { studentApi } from '@/features/student';
import { handleApiErrorWithUI } from '@/utils';

export const useViewStudent = (studentId: string) => {
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => studentApi.view(studentId),
    enabled: !!studentId,
    meta: {
      onError: (err: any) => handleApiErrorWithUI(err, navigate),
    },
  });

  return {
    student: query.data?.data,
    isLoading: query.isLoading,
  };
};
