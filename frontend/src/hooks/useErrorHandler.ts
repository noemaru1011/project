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

      if (status === 400) {
        switch (code) {
          case "INVALID_OLD_PASSWORD":
            toast.error("現在のパスワードが違います");
            return;
          default:
            toast.error(message);
            return;
        }
      }

      if (status === 401) {
        switch (code) {
          case "INVALID_CREDENTIALS":
            toast.error("メールアドレスかパスワードが違います");
            return;
          case "TOKEN_EXPIRED":
          case "INVALID_TOKEN":
            navigate(ROUTES.AUTH.LOGIN);
            toast.error("ログインしてください");
            return;
          default:
            navigate(ROUTES.AUTH.LOGIN);
            toast.error(message);
            return;
        }
      }

      if (status === 403) {
        navigate(ROUTES.ERROR.FORBIDDEN);
        toast.error("権限がありません");
        return;
      }

      if (status >= 500) {
        navigate(ROUTES.ERROR.SERVER);
        toast.error("サーバーエラーが発生しました");
        return;
      }

      toast.error(message);
    },
    [navigate]
  );
};
