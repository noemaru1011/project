import { LoginForm } from '@/features/auth/components';
import type { LoginInput } from '@shared/models/auth';
import { useLogin } from '@/features/auth/hooks/useLogin';

export const Login = () => {
  const { login, loading } = useLogin();

  const onSubmit = (data: LoginInput) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">ログイン</h2>
        <p className="text-center text-gray-500">メールアドレスとパスワードを入力してください</p>
        <LoginForm onSubmit={onSubmit} loading={loading} />
      </div>
    </div>
  );
};
