import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routes';
import { studentApi } from '@/features/student';
import type { StudentCreateInput } from '@shared/models/student';
import { handleApiErrorWithUI } from '@/utils';

export const useCreateStudent = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: StudentCreateInput) => studentApi.create(data),
    onSuccess: (res) => {
      toast.success(res.message);
      navigate(ROUTES.STUDENT.INDEX);
    },
    onError: (err) => {
      handleApiErrorWithUI(err, navigate);
    },
  });

  return {
    createStudent: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
