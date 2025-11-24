import { PasswordApi } from '@/api/passwordApi';
import type { DisplayPassword } from '@/types/displayPassword';
import { useLoadingCounter } from './useLoading';
import { useErrorHandler } from './useErrorHandler';
import { toast } from 'react-toastify';

//IDが不要なためuseCrudではなくusePasswordを作成
export function usePassword() {
  const { loading, start, end } = useLoadingCounter();
  const handleError = useErrorHandler();

  const updatePassword = async (data: DisplayPassword) => {
    try {
      start();
      const response = await PasswordApi.update(data);
      toast.success(response.message);
    } catch (err: any) {
      handleError(err);
      throw err; // ← ここで再スローする
    } finally {
      end();
    }
  };

  return { updatePassword, loading };
}
