import { authApi } from '@/features/auth/api';
import type { PasswordForm } from '@shared/schemas/password';
import { useLoadingCounter } from '@/hooks/ui/useLoadingCounter';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';

export function usePassword() {
  const { loading, start, end } = useLoadingCounter();
  const { setPasswordUpdateRequired } = usePasswordUpdateContext();

  const update = async (data: PasswordForm) => {
    start();
    try {
      const res = await authApi.updatePassword(data);
      setPasswordUpdateRequired(false);
      return res;
    } finally {
      end();
    }
  };

  return { update, loading };
}
