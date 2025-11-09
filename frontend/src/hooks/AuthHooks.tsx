import { useState } from "react";
import { AuthApi } from "@/api/loginApi";
import type { Auth } from "@shared/schemas/login";

export function useAuth() {
  const [user, setUser] = useState<Partial<Auth> | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (data: Partial<Auth>) => {
    setLoading(true);
    try {
      const res = await AuthApi.login(data);
      console.log(data);
      setUser(res);
      return res;
    } finally {
      setLoading(false);
    }
  };

  return { user, login, loading };
}
