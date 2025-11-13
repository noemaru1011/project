import { useState } from "react";
import { PasswordApi } from "@/api/passwordApi";
import type { Password } from "@shared/schemas/password";
import { useErrorHandler } from "./useErrorHandler";
import { toast } from "react-toastify";

export function usePassword() {
  const [user, setUser] = useState<Partial<Password> | null>(null);
  const [loading, setLoading] = useState(false);
  const handleError = useErrorHandler();

  const updatePassword = async (data: Partial<Password>) => {
    try {
      setLoading(true);
      const result = await PasswordApi.update(data);
      setUser(result);
      toast.success("パスワードを変更しました");
      return result;
    } catch (err: any) {
      handleError(err);
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { user, updatePassword, loading };
}
