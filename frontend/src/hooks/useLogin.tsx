import { useState } from "react";
import { AuthApi } from "@/api/loginApi";
import type { Auth } from "@shared/schemas/login";
import { toast } from "react-toastify";
import { useErrorHandler } from "./useErrorHandler";

export function useAuth() {
  const [user, setUser] = useState<Partial<Auth> | null>(null);
  const [loading, setLoading] = useState(false);
  const handleError = useErrorHandler();

  const login = async (data: Partial<Auth>) => {
    try {
      setLoading(true);
      const result = await AuthApi.login(data);
      setUser(result);
      toast.success("ログインに成功しました！");
      return result;
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return { user, login, loading };
}
