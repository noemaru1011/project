import { PasswordApi } from '@/api/passwordApi';
import type { PasswordForm } from '@shared/schemas/password';
import { useLoadingCounter } from './useLoading';
import { useLoginContext } from '@/hooks/loginContext';

//IDが不要なためusePasswordを作成
export function usePassword() {
  const { loading, start, end } = useLoadingCounter();
  const { setPasswordUpdateRequired } = useLoginContext();

  const update = async (data: PasswordForm) => {
    start();
    try {
      const res = await PasswordApi.update(data);
      setPasswordUpdateRequired(false);
      return res;
    } finally {
      end();
    }
  };

  return { update, loading };
}
