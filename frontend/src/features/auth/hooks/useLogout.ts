import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from '@/features/auth/api';
import { useAuth } from '@/contexts/authContext';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';
import { ROUTES } from '@/routes/routes';
import { handleApiErrorWithUI } from '@/utils';

export function useLogout() {
  const navigate = useNavigate();
  const { setRole } = useAuth();
  const { setPasswordUpdateRequired } = usePasswordUpdateContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => authApi.logout(),

    onSuccess: (res) => {
      setRole(null);
      setPasswordUpdateRequired(false);
      queryClient.clear();

      toast.success(res.message);
      navigate(ROUTES.AUTH.LOGIN);
    },

    onError: (err) => {
      handleApiErrorWithUI(err, navigate);
    },
  });

  return {
    logout: mutation.mutate,
    loading: mutation.isPending,
  };
}
