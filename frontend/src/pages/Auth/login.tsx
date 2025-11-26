import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Loading } from '@/components/atoms/Loading';
import { validation } from '@shared/schemas/login';
import type { LoginForm } from '@shared/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/hooks/useLogin';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export const Login = () => {
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
    await login(data);
  };

  return (
    <Loading loading={loading}>
      <div className="mt-5 flex justify-center min-h-screen">
        <div className="w-full max-w-md space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              type="email"
              label="メールアドレス"
              leftIcon={<Mail className="size-4" />}
              required
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              id="studentPassword"
              type={showPassword ? 'text' : 'password'}
              label="パスワード"
              leftIcon={<Lock className="size-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pointer-events-auto hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              }
              required
              error={errors.password?.message}
              {...register('password')}
            />
            <Button type="submit" variant="Login" className="w-full mt-4" disabled={loading} />
          </form>
        </div>
      </div>
    </Loading>
  );
};
