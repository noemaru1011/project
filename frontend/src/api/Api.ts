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

    // サーバー側エラー
    if (res.status >= 500) {
      NavigationService.navigate(ROUTES.Error.SERVER);
      const message = (data as any).error || "予期せぬエラーが発生しました";
      throw new Error(message);
    }
    // クライアント側エラー（権限なし）
    if (res.status == 403) {
      NavigationService.navigate(ROUTES.Error.FORBIDDEN);
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
      NavigationService.navigate(ROUTES.Error.SERVER);
      const message = (data as any).error || "予期せぬエラーが発生しました";
      throw new Error(message);
    }

    return data;
  } catch (error) {
    //レスポンスが取得できなかった場合、ネットワークやJSON変換失敗など
    NavigationService.navigate(ROUTES.Error.SERVER);
    if (error instanceof Error) throw error;
    throw new Error("予期せぬエラーが発生しました");
  }
}
