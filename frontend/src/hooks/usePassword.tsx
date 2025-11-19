import { useState } from 'react';
import { PasswordApi } from '@/api/passwordApi';
import type { DisplayPassword } from '@/types/displayPassword';
import { useErrorHandler } from './useErrorHandler';
import { toast } from 'react-toastify';

export function usePassword() {
  const [loading, setLoading] = useState(false);
  const handleError = useErrorHandler();

  const updatePassword = async (data: DisplayPassword) => {
    try {
      setLoading(true);
      const response = await PasswordApi.update(data);
      toast.success(response.message);
    } catch (err: any) {
      handleError(err);
      throw err; // ← ここで再スローする
    } finally {
      setLoading(false);
    }
  };

  return { updatePassword, loading };
}
