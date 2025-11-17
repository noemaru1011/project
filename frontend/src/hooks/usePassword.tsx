import { useState } from "react";
import { PasswordApi } from "@/api/passwordApi";
import type { Password } from "@shared/schemas/password";
import { useErrorHandler } from "./useErrorHandler";
import { toast } from "react-toastify";

export function usePassword() {
  const [loading, setLoading] = useState(false);
  const handleError = useErrorHandler();

  const updatePassword = async (data: Partial<Password>) => {
    try {
      setLoading(true);
      await PasswordApi.update(data);
      toast.success("パスワードを変更しました");
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return { updatePassword, loading };
}
