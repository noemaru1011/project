import { useForm } from 'react-hook-form';
import { Input } from '@/components/elements/Input';
import { Button } from '@/components/elements/Button';
import { Loading } from '@/components/elements/Loading';
import { validation } from '@shared/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/hooks/useLogin';
import type { DisplayLogin } from '@/types/displayLogin';

const Login = () => {
  const { login, loading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
  });

  const onSubmit = async (data: DisplayLogin) => {
    try {
      await login(data);
    } catch (err: any) {}
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
              required
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              id="studentPassword"
              type="password"
              label="パスワード"
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

export default Login;
