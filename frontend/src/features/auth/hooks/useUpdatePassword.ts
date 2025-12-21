import { authApi } from '@/features/auth/api';
import type { PasswordForm } from '@shared/schemas/password';
import { useLoadingCounter } from '@/hooks/useLoadingCounter';
import { useLoginContext } from '@/hooks/passwordUpdateContext';

//IDが不要なためusePasswordを作成
export function usePassword() {
  const { loading, start, end } = useLoadingCounter();
  const { setPasswordUpdateRequired } = useLoginContext();

  const update = async (data: PasswordForm) => {
    start();
    try {
      const res = await authApi.updatePassword(data);
      setPasswordUpdateRequired(false);
      return res;
    } catch (e) {
      throw e;
    } finally {
      end();
    }
  };

  return { update, loading };
}
