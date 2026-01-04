import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button/Button';
import { LoginPasswordInput, LoginEmailInput } from '@/features/auth/components';
import { validation } from '@shared/schemas/login';
import type { LoginForm as LoginFormType } from '@shared/schemas/login';

type Props = {
  onSubmit: (data: LoginFormType) => void;
  loading: boolean;
};

export const LoginForm = ({ onSubmit, loading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <LoginEmailInput
        autoComplete="username"
        error={errors.email?.message}
        {...register('email')}
      />
      <LoginPasswordInput
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button type="submit" variant="Login" className="w-full py-3 mt-2" disabled={loading} />
    </form>
  );
};
