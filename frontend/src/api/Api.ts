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
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      ...options,
    });

    // サーバー側エラー
    if (res.status >= 500) {
      NavigationService.navigate(ROUTES.Error.SERVER);
    }
    // クライアント側エラー（認証エラーなど）
    if (res.status == 403) {
      NavigationService.navigate(ROUTES.Error.Forbidden);
    }

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API Error: ${res.status} ${errorText}`);
    }

    const data: T = await res.json();
    return data;
  } catch (error) {
    //レスポンスが取得できなかった場合
    throw error;
  }
}
