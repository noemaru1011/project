import { toast } from 'react-toastify';
import { LoginForm } from '@/features/auth/components';
import type { LoginForm as LoginFormType } from '@shared/schemas/login';
import { Loading } from '@/components/ui/Loading/Loading';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { handleApiError } from '@/utils';

export const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useLogin();

  const onSubmit = async (data: LoginFormType) => {
    try {
      const res = await login(data);
      toast.success(res.message);
      navigate(ROUTES.HOME);
    } catch (e) {
      handleApiError(e, navigate);
    }
  };

  return (
    <Loading loading={loading}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">ログイン</h2>
          <p className="text-center text-gray-500">メールアドレスとパスワードを入力してください</p>
          <LoginForm onSubmit={onSubmit} loading={loading} />
        </div>
      </div>
    </Loading>
  );
};
