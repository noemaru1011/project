import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button/Button';
import {
  OldPasswordInput,
  NewPasswordInput,
  CheckNewPasswordInput,
} from '@/features/auth/components';
import { PasswordUpdateSchema } from '@shared/models/auth';
import type { PasswordUpdateInput } from '@shared/models/auth';

type Props = {
  onSubmit: (data: PasswordUpdateInput) => void;
  loading: boolean;
};

export const PasswordUpdateForm = ({ onSubmit, loading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordUpdateInput>({
    resolver: zodResolver(PasswordUpdateSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <OldPasswordInput error={errors.oldPassword?.message} {...register('oldPassword')} />
      <NewPasswordInput error={errors.newPassword?.message} {...register('newPassword')} />
      <CheckNewPasswordInput
        error={errors.checkNewPassword?.message}
        {...register('checkNewPassword')}
      />

      <Button type="submit" variant="Update" disabled={loading} className="w-full mt-4" />
    </form>
  );
};
