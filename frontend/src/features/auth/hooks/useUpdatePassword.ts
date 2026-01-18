import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';
import type { PasswordUpdateInput } from '@shared/models/auth';

export function useUpdatePassword() {
  const { setPasswordUpdateRequired } = usePasswordUpdateContext();

  const mutation = useMutation({
    // 実行するAPI関数
    mutationFn: (data: PasswordUpdateInput) => authApi.updatePassword(data),

    // 成功時の処理
    onSuccess: () => {
      // パスワード更新が完了したので、!マークを消す
      setPasswordUpdateRequired(false);
    },
  });

  return {
    update: mutation.mutateAsync,
    loading: mutation.isPending,
  };
}
