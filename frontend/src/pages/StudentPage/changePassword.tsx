import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { validation } from '@shared/schemas/password';
import { usePassword } from '@/hooks/usePassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { ROUTES } from '@/constants/routes';
import { Loading } from '@/components/atoms/Loading';
import { Lock, Eye, EyeOff } from 'lucide-react';

export const ChangePassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { updatePassword, loading } = usePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
  });

  // 送信処理
  const onSubmit = async (data: any) => {
    try {
      await updatePassword(data);
      navigate(ROUTES.HOME);
    } catch (err: any) {}
  };

  return (
    <Loading loading={loading}>
      <div className="mt-5 flex justify-center min-h-screen">
        <div className="w-full max-w-md space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="oldPassword"
              label="古いパスワード"
              type={showPassword ? 'text' : 'password'}
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
              error={errors.oldPassword?.message}
              required
              {...register('oldPassword')}
            />
            <Input
              id="newPassword1"
              label="新しいパスワード"
              type={showPassword ? 'text' : 'password'}
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
              error={errors.newPassword1?.message}
              required
              {...register('newPassword1')}
            />
            <Input
              id="newPassword2"
              label="新しいパスワード(確認)"
              type={showPassword ? 'text' : 'password'}
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
              error={errors.newPassword2?.message}
              required
              {...register('newPassword2')}
            />

            <Button type="submit" variant="Update" disabled={loading} className="w-full mt-4" />
          </form>
        </div>
      </div>
    </Loading>
  );
};
