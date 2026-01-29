import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from '@/features/auth/api';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';
import { ROUTES } from '@/routes/routes';
import { handleApiErrorWithUI } from '@/utils';
import type { PasswordUpdateInput } from '@shared/models/auth';

export function useUpdatePassword() {
  const navigate = useNavigate();
  const { setPasswordUpdateRequired } = usePasswordUpdateContext();

  const mutation = useMutation({
    mutationFn: (data: PasswordUpdateInput) => authApi.updatePassword(data),

    onSuccess: (res) => {
      setPasswordUpdateRequired(false);
      toast.success(res.message);
      navigate(ROUTES.HOME);
    },

    onError: (err) => {
      handleApiErrorWithUI(err, navigate);
    },
  });

  return {
    submit: mutation.mutate,
    loading: mutation.isPending,
  };
}
