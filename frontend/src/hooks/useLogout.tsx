import { useState } from 'react';
import { LogoutApi } from '@/api/logoutApi';
import { toast } from 'react-toastify';
import { useErrorHandler } from './useErrorHandler';

export function useLogout() {
  const [loading, setLoading] = useState(false);
  const handleError = useErrorHandler();

  const logout = async () => {
    try {
      setLoading(true);
      const result = await LogoutApi.logout();
      toast.success(result.message ?? 'ログアウトしました');
      return result;
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
}
