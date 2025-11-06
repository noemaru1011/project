const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * 汎用 fetch ラッパー
 * CSRFトークン付与・JSON化・ネットワークエラーハンドリング
 */
export async function fetchJson<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
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

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const message = (data as any).error || "予期せぬエラーが発生しました";
      throw new Error(message);
    }

    return data;
  } catch (error) {
    //レスポンスがない場合
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
