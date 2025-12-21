import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/ui/Button/Button';
import { Loading } from '@/components/atoms/Loading';
import { validation } from '@shared/schemas/login';
import type { LoginForm } from '@shared/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { handleApiError } from '@/utils/handleApiError';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await login(data);
      toast.success(res.message);
      navigate(ROUTES.HOME);
    } catch (err: any) {
      handleApiError(err, navigate);
    }
  };

  return (
    <Loading loading={loading}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">ログイン</h2>
          <p className="text-center text-gray-500">メールアドレスとパスワードを入力してください</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="email"
              type="email"
              label="メールアドレス"
              leftIcon={<Mail className="size-5 text-indigo-500" />}
              required
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="パスワード"
              leftIcon={<Lock className="size-5 text-indigo-500" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pointer-events-auto hover:text-indigo-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              }
              required
              error={errors.password?.message}
              {...register('password')}
            />

            <Button type="submit" variant="Login" className="w-full py-3 mt-2" disabled={loading} />
          </form>
        </div>
      </div>
    </Loading>
  );
};
