import { useState } from 'react';
import { LoginApi } from '@/api/loginApi';
import type { DisplayLogin } from '@/types/displayLogin';
import { toast } from 'react-toastify';
import { useErrorHandler } from './useErrorHandler';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export function useLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleError = useErrorHandler();

  const login = async (data: DisplayLogin) => {
    try {
      setLoading(true);
      const response = await LoginApi.login(data);
      toast.success(response.message);
      navigate(ROUTES.HOME);
    } catch (err: any) {
      handleError(err);
      throw err; // ← ここで再スローする
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
