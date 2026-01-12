import { authApi } from '@/features/auth/api';
import type { PasswordUpdateInput } from '@shared/models/auth';
import { useLoadingCounter } from '@/hooks/ux/useLoadingCounter';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';

export function usePassword() {
  const { loading, start, end } = useLoadingCounter();
  const { setPasswordUpdateRequired } = usePasswordUpdateContext();

  const update = async (data: PasswordUpdateInput) => {
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
