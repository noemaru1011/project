import { useState } from 'react';
import { LoginApi } from '@/api/loginApi';
import type { Auth } from '@shared/schemas/login';
import { toast } from 'react-toastify';
import { useErrorHandler } from './useErrorHandler';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export function useLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleError = useErrorHandler();

  const login = async (data: Partial<Auth>) => {
    try {
      setLoading(true);
      await LoginApi.login(data);
      toast.success('ログインに成功しました！');
      navigate(ROUTES.HOME);
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
