import { useMutation, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '@/features/student';

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (studentId: string) => studentApi.delete(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'], exact: false });
    },
  });

  return {
    deleteStudent: mutation.mutateAsync,
    isDeleting: mutation.isPending,
  };
};
