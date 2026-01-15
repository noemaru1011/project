import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button/Button';
import { LoginPasswordInput, LoginEmailInput, RememberCheckbox } from '@/features/auth/components';
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

  const [remember, setRemember] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <LoginEmailInput
        autoComplete={remember ? 'username' : 'off'}
        error={errors.email?.message}
        {...register('email')}
      />
      <LoginPasswordInput
        autoComplete={remember ? 'current-password' : 'off'}
        error={errors.password?.message}
        {...register('password')}
      />
      <RememberCheckbox checked={remember} onChange={(e) => setRemember(e.target.checked)} />

      <Button type="submit" variant="Login" className="w-full py-3 mt-2" disabled={loading} />
    </form>
  );
};
