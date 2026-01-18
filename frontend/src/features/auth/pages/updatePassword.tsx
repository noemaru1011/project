import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PasswordUpdateForm } from '@/features/auth/components/layouts/PasswordUpdateForm';
import { useUpdatePassword } from '@/features/auth/hooks/useUpdatePassword';
import { ROUTES } from '@/routes/routes';
import type { PasswordUpdateInput } from '@shared/models/auth';
import { handleApiErrorWithUI } from '@/utils';

export const ChangePassword = () => {
  const navigate = useNavigate();
  const { update, loading } = useUpdatePassword();

  const onSubmit = async (data: PasswordUpdateInput) => {
    try {
      const res = await update(data);
      toast.success(res.message);
      navigate(ROUTES.HOME);
    } catch (err) {
      handleApiErrorWithUI(err, navigate);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">パスワード変更</h2>
        <PasswordUpdateForm onSubmit={onSubmit} loading={loading} />
      </div>
    </div>
  );
};
