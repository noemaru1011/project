import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/ui/Button/Button';
import { validation } from '@shared/schemas/password';
import { usePassword } from '@/hooks/useUpdatePassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { ROUTES } from '@/constants/routes';
import { Loading } from '@/components/atoms/Loading';
import type { PasswordForm } from '@shared/schemas/password';
import { handleApiError } from '@/utils/handleApiError';
import { Lock, Eye, EyeOff } from 'lucide-react';

export const ChangePassword = () => {
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const { update, loading } = usePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
  });

  // 送信処理
  const onSubmit = async (data: PasswordForm) => {
    try {
      const res = await update(data);
      toast.success(res.message);
      navigate(ROUTES.HOME);
    } catch (err: any) {
      handleApiError(err, navigate);
    }
  };

  return (
    <Loading loading={loading}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">パスワード変更</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              id="oldPassword"
              label="古いパスワード"
              type={showPassword1 ? 'text' : 'password'}
              leftIcon={<Lock className="size-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword1(!showPassword1)}
                  className="pointer-events-auto hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword1 ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              }
              error={errors.oldPassword?.message}
              required
              {...register('oldPassword')}
            />
            <Input
              id="newPassword1"
              label="新しいパスワード"
              type={showPassword2 ? 'text' : 'password'}
              leftIcon={<Lock className="size-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword2(!showPassword2)}
                  className="pointer-events-auto hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword2 ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              }
              error={errors.newPassword?.message}
              required
              {...register('newPassword')}
            />
            <Input
              id="newPassword2"
              label="新しいパスワード(確認)"
              type={showPassword3 ? 'text' : 'password'}
              leftIcon={<Lock className="size-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword3(!showPassword3)}
                  className="pointer-events-auto hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword3 ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              }
              error={errors.checkNewPassword?.message}
              required
              {...register('checkNewPassword')}
            />

            <Button type="submit" variant="Update" disabled={loading} className="w-full mt-4" />
          </form>
        </div>
      </div>
    </Loading>
  );
};
