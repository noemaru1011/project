import { useMutation } from '@tanstack/react-query';
import { studentApi } from '@/features/student';
import type { StudentCreateInput } from '@shared/models/student';

export const useCreateStudent = () => {
  const mutation = useMutation({
    mutationFn: (data: StudentCreateInput) => studentApi.create(data),
  });

  return {
    createStudent: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
