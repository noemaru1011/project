import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginForm } from '@/features/auth/components';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { useAuth } from '@/contexts/authContext';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';
import { ROUTES } from '@/routes/routes';
import { handleApiErrorWithUI } from '@/utils';
import type { LoginInput } from '@shared/models/auth';

export const Login = () => {
  const navigate = useNavigate();
  const { setRole } = useAuth();
  const { setPasswordUpdateRequired } = usePasswordUpdateContext();
  const { login, isPending } = useLogin();

  const onSubmit = (data: LoginInput) => {
    login(data, {
      onSuccess: (res) => {
        const required = res.data?.passwordUpdateRequired ?? false;
        setPasswordUpdateRequired(required);
        setRole(res.data?.role ?? null);

        toast.success(res.message);
        navigate(ROUTES.HOME);
      },
      onError: (err) => handleApiErrorWithUI(err, navigate),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">ログイン</h2>
        <p className="text-center text-gray-500">メールアドレスとパスワードを入力してください</p>
        <LoginForm onSubmit={onSubmit} loading={isPending} />
      </div>
    </div>
  );
};
