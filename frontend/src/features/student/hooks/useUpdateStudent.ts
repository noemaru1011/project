import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '@/features/student';
import type { StudentUpdateInput } from '@shared/models/student';

export const useUpdateStudent = (studentId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => studentApi.view(studentId),
    enabled: !!studentId,
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: (data: StudentUpdateInput) => studentApi.update(studentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['student', studentId] });
    },
  });

  return {
    student: query.data?.data,
    isFetching: query.isLoading,
    fetchError: query.error,
    updateStudent: mutation.mutate,
    isUpdating: mutation.isPending,
  };
};
