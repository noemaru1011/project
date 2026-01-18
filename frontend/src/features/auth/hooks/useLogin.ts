import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';
import { useAuth } from '@/contexts/atchContext';
import type { LoginInput } from '@shared/models/auth';

export function useLogin() {
  const { setPasswordUpdateRequired } = usePasswordUpdateContext();
  const { setRole } = useAuth();

  const mutation = useMutation({
    // 実行するAPI関数
    mutationFn: (data: LoginInput) => authApi.login(data),

    // 成功時の共通処理（Contextの更新など）をここに集約できる
    onSuccess: (res) => {
      const required = res.data?.passwordUpdateRequired ?? false;
      setPasswordUpdateRequired(required);
      setRole(res.data?.role ?? null);
    },
  });

  return {
    login: mutation.mutateAsync, // 非同期(async/await)で呼び出せる関数
    loading: mutation.isPending, // 通信中フラグ
  };
}
