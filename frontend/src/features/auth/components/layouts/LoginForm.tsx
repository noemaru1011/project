import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button/Button';
import { LoginPasswordInput, LoginEmailInput } from '@/features/auth/components';
import { LoginSchema } from '@shared/models/auth';
import type { LoginInput } from '@shared/models/auth';

type Props = {
  onSubmit: (data: LoginInput) => void;
  loading: boolean;
};

export const LoginForm = ({ onSubmit, loading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <LoginEmailInput
        autoComplete={'username'}
        error={errors.email?.message}
        {...register('email')}
      />
      <LoginPasswordInput
        autoComplete={'current-password'}
        error={errors.password?.message}
        {...register('password')}
      />

      <Button
        type="submit"
        variant="Primary"
        label="ログイン"
        className="w-full py-3 mt-2"
        disabled={loading}
      />
    </form>
  );
};
