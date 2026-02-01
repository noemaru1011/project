import { useQuery } from '@tanstack/react-query';
import { studentApi } from '@/features/student';

export const useViewStudent = (studentId: string) => {
  const query = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => studentApi.view(studentId),
    enabled: !!studentId,
    retry: false,
  });

  return {
    student: query.data?.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
