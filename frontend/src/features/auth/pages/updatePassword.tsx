import { PasswordUpdateForm } from '@/features/auth/components/layouts/PasswordUpdateForm';
import { useUpdatePassword } from '@/features/auth/hooks/useUpdatePassword';

export const ChangePassword = () => {
  const { submit, loading } = useUpdatePassword();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">パスワード変更</h2>
        <PasswordUpdateForm onSubmit={submit} loading={loading} />
      </div>
    </div>
  );
};
