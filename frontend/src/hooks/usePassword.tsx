import { PasswordApi } from '@/api/passwordApi';
import type { Password } from '@shared/schemas/password';
import { useLoadingCounter } from './useLoading';
import { useErrorHandler } from './useErrorHandler';
import { useLoginContext } from '@/hooks/useLoginContext';
import { toast } from 'react-toastify';

//IDが不要なためuseCrudではなくusePasswordを作成
export function usePassword() {
  const { loading, start, end } = useLoadingCounter();
  const { setPasswordUpdateRequired } = useLoginContext();
  const handleError = useErrorHandler();

  const update = async (data: Password) => {
    try {
      start();
      const response = await PasswordApi.update(data);
      setPasswordUpdateRequired(false);
      toast.success(response.message);
    } catch (err: any) {
      handleError(err);
      throw err; // ← ここで再スローする
    } finally {
      end();
    }
  };

  return { update, loading };
}
