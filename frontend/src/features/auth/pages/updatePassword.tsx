import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PasswordUpdateForm } from '@/features/auth/components/PasswordUpdateForm';
import { usePassword } from '@/features/auth/hooks/useUpdatePassword';
import { ROUTES } from '@/constants/routes';
import { Loading } from '@/components/ui/Loading/Loading';
import type { PasswordForm } from '@shared/schemas/password';
import { handleApiError } from '@/utils';

export const ChangePassword = () => {
  const navigate = useNavigate();
  const { update, loading } = usePassword();

  // 送信処理
  const onSubmit = async (data: PasswordForm) => {
    try {
      const res = await update(data);
      toast.success(res.message);
      navigate(ROUTES.HOME);
    } catch (err) {
      const error = handleApiError(err);
      toast.error(error.message);
      if (error.redirectTo) {
        navigate(error.redirectTo);
      }
    }
  };

  return (
    <Loading loading={loading}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">パスワード変更</h2>
          <PasswordUpdateForm onSubmit={onSubmit} loading={loading} />
        </div>
      </div>
    </Loading>
  );
};
