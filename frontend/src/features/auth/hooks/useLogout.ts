import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api';
import { useAuth } from '@/contexts/authContext';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';

export function useLogout() {
  const { setRole } = useAuth();
  const { setPasswordUpdateRequired } = usePasswordUpdateContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => authApi.logout(),

    // ログアウトに成功した時の処理
    onSuccess: () => {
      // 1. 認証状態をクリア
      setRole(null);
      setPasswordUpdateRequired(false);

      // 2. 重要！キャッシュをすべて削除する
      // 他人のデータがメモリに残らないように真っさらにします
      queryClient.clear();
    },
  });

  return {
    logout: mutation.mutateAsync,
    loading: mutation.isPending,
  };
}
