import { useState, useEffect } from "react";
import { AuthApi } from "@/api/authApi";
import type { Auth } from "@shared/schemas/Auth";

export function useAuth() {
  const [user, setUser] = useState<Partial<Auth> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const login = async (data: Partial<Auth>) => {
    try {
      setLoading(true);
      const res = await AuthApi.login(data);
      setUser(res);
    } catch (err: any) {
      setError(true);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // // Cookie 認証を確認
  // const checkAuth = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await AuthApi.checkAuth(); // ← ここを login ではなく checkAuth に
  //     setUser(res);
  //   } catch {
  //     setUser(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (!user) checkAuth();
  // }, []);

  return { user, login, loading, error };
}
