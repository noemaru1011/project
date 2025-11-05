import { ROUTES } from "@/domain/routes";
import { NavigationService } from "@/utils/NavigationService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * バックエンドAPIを呼び出す汎用関数
 * @param path - APIエンドポイント
 * @param options - fetchのオプション
 */
export async function Api<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      ...options,
    });

    // レスポンスを安全にJSON化
    const data = await res.json().catch(() => ({}));
    console.log(JSON.stringify(data, null, 2));

    // サーバー側エラー
    if (res.status >= 500) {
      const message = (data as any).error || "予期せぬエラーが発生しました";
      throw new Error(message);
    }
    // クライアント側エラー（権限なし）
    if (res.status == 403) {
      const message = (data as any).error || "権限がありません";
      throw new Error(message);
    }
    // クライアント側エラー（未ログイン）
    if (res.status == 401) {
      NavigationService.navigate(ROUTES.Auth.LOGIN);
      const message = (data as any).error || "ログインしてください";
      throw new Error(message);
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
