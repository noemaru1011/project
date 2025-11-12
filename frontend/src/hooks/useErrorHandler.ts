import { useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export const useErrorHandler = () => {
  const navigate = useNavigate();

  return useCallback(
    (err: any) => {
      const status = err?.status;
      const code = err?.code;
      const message = err?.message ?? "予期せぬエラーが発生しました";

      if (status === 401) {
        switch (code) {
          case "INVALID_CREDENTIALS":
            toast.error("メールアドレスかパスワードが違います");
            return;
          case "TOKEN_EXPIRED":
          case "INVALID_TOKEN":
            navigate(ROUTES.Auth.LOGIN);
            toast.error("ログインしてください");
            return;
          default:
            navigate(ROUTES.Auth.LOGIN);
            toast.error(message);
            return;
        }
      }

      if (status === 403) {
        navigate(ROUTES.Error.FORBIDDEN);
        toast.error("権限がありません");
        return;
      }

      if (status >= 500) {
        navigate(ROUTES.Error.SERVER);
        toast.error("サーバーエラーが発生しました");
        return;
      }

      toast.error(message);
    },
    [navigate]
  );
};
