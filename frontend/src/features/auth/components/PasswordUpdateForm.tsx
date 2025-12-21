import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button/Button';
import { PasswordInput } from '@/features/auth/components';
import { validation } from '@shared/schemas/password';
import type { PasswordForm } from '@shared/schemas/password';

type Props = {
  onSubmit: (data: PasswordForm) => void;
  loading: boolean;
};

export const PasswordUpdateForm = ({ onSubmit, loading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <PasswordInput
        id="oldPassword"
        label="古いパスワード"
        error={errors.oldPassword?.message}
        {...register('oldPassword')}
      />
      <PasswordInput
        id="newPassword1"
        label="新しいパスワード"
        error={errors.newPassword?.message}
        {...register('newPassword')}
      />
      <PasswordInput
        id="newPassword2"
        label="新しいパスワード(確認)"
        error={errors.checkNewPassword?.message}
        {...register('checkNewPassword')}
      />

      <Button type="submit" variant="Update" disabled={loading} className="w-full mt-4" />
    </form>
  );
};
