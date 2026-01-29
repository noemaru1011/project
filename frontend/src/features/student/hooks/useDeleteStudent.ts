import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ROUTES } from '@/routes/routes';
import { studentApi } from '@/features/student';
import { handleApiErrorWithUI } from '@/utils';
import { APIMESSAGE } from '@shared/constants/apiMessage';

export const useDeleteStudent = (studentId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => studentApi.view(studentId),
    enabled: !!studentId,
    meta: {
      onError: (err: any) => handleApiErrorWithUI(err, navigate),
    },
  });

  const mutation = useMutation({
    mutationFn: () => studentApi.delete(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success(APIMESSAGE.DELETE_SUCCESS);
      navigate(ROUTES.STUDENT.INDEX);
    },
    onError: (err) => handleApiErrorWithUI(err, navigate),
  });

  return {
    student: query.data?.data,
    isFetching: query.isLoading,
    deleteStudent: mutation.mutate,
    isDeleting: mutation.isPending,
  };
};
