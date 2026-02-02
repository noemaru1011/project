import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PasswordUpdateForm } from '@/features/auth/components/layouts/PasswordUpdateForm';
import { useUpdatePassword } from '@/features/auth/hooks/useUpdatePassword';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';
import { ROUTES } from '@/routes/routes';
import { handleApiErrorWithUI } from '@/utils';
import type { PasswordUpdateInput } from '@shared/models/auth';

export const ChangePassword = () => {
  const navigate = useNavigate();
  const { setPasswordUpdateRequired } = usePasswordUpdateContext();
  const { submit, isPending } = useUpdatePassword();

  const onSubmit = (data: PasswordUpdateInput) => {
    submit(data, {
      onSuccess: (res) => {
        setPasswordUpdateRequired(false);
        toast.success(res.message);
        navigate(ROUTES.HOME);
      },
      onError: (err) => handleApiErrorWithUI(err, navigate),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">パスワード変更</h2>
        <PasswordUpdateForm onSubmit={onSubmit} loading={isPending} />
      </div>
    </div>
  );
};
