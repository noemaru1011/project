import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from '@/features/auth/api';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';
import { useAuth } from '@/contexts/authContext';
import { ROUTES } from '@/routes/routes';
import { handleApiErrorWithUI } from '@/utils';
import type { LoginInput } from '@shared/models/auth';

export function useLogin() {
  const navigate = useNavigate();
  const { setPasswordUpdateRequired } = usePasswordUpdateContext();
  const { setRole } = useAuth();

  const mutation = useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),

    onSuccess: (res) => {
      const required = res.data?.passwordUpdateRequired ?? false;
      setPasswordUpdateRequired(required);
      setRole(res.data?.role ?? null);

      toast.success(res.message);
      navigate(ROUTES.HOME);
    },

    onError: (err) => {
      handleApiErrorWithUI(err, navigate);
    },
  });

  return {
    login: mutation.mutate,
    loading: mutation.isPending,
  };
}
