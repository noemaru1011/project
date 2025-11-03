import { useState } from "react";
import { AuthApi } from "@/api/authApi";
import type { Auth } from "@shared/schemas/Auth";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: Auth) => {
    try {
      setLoading(true);
      const res = await AuthApi.login(data);
      return res;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
