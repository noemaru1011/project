import { ROUTES } from "@/constants/routes";
import { NavigationService } from "@/utils/NavigationService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * バックエンドAPIを呼び出す汎用関数
 * @param path - APIエンドポイント
 * @param options - fetchのオプション
 */
export async function Api<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    const csrfToken = sessionStorage.getItem("csrfToken");
    const res = await fetch(`${API_BASE_URL}${path}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
        ...(options?.headers || {}),
      },
      ...options,
    });

    // レスポンスを安全にJSON化
    const data = await res.json().catch(() => ({}));
    console.log(data);

    // サーバー側エラー
    if (res.status >= 500) {
      const message = (data as any).error || "予期せぬエラーが発生しました";
      throw new Error(message);
    }
    // クライアント側エラー（権限なし）
    if (res.status == 403) {
      const message = (data as any).error || "権限がありません";
      NavigationService.navigate(ROUTES.Error.FORBIDDEN);
      throw new Error(message);
    }
    // クライアント側エラー（未ログイン、トークン切れ、無効なトークン）
    if (res.status === 401) {
      const { code, message } = data as any;
      console.log(code);

      // 状況に応じて挙動を分岐
      switch (code) {
        case "INVALID_CREDENTIALS":
          // → メールアドレスかパスワードが違います
          throw new Error(message || "メールアドレスかパスワードが違います");

        case "TOKEN_EXPIRED":
          // → Cookie／トークン切れ
          NavigationService.navigate(ROUTES.Auth.LOGIN);
          throw new Error(message || "ログインしてください");

        case "INVALID_TOKEN":
          // → 不正トークンや改ざんなど
          NavigationService.navigate(ROUTES.Auth.LOGIN);
          throw new Error(message || "無効なトークンです");

        default:
          // → その他不明な401
          NavigationService.navigate(ROUTES.Auth.LOGIN);
          throw new Error(message || "予期せぬエラーが発生しました");
      }
    }

    if (!res.ok) {
      const message = (data as any).error || "予期せぬエラーが発生しました";
      throw new Error(message);
    }

    return data;
  } catch (error) {
    let message = "予期せぬエラーが発生しました";
    if (error instanceof Error) {
      if (error.message === "Failed to fetch") {
        message =
          "サーバーに接続できません。ネットワークやサーバーの状態を確認してください";
      } else {
        message = error.message;
      }
    }
    throw new Error(message);
  }
}
