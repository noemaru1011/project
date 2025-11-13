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

    const data = await res.json().catch(() => ({}));

    // 通信成功でも、エラーコード付きなら throw する
    if (!res.ok) {
      throw {
        status: res.status,
        code: data.code,
        message: data.error || data.message || "エラーが発生しました",
      };
    }

    return data as T;
  } catch (err: any) {
    // fetch レベルの接続エラー
    if (err instanceof TypeError) {
      throw {
        status: 0,
        code: "NETWORK_ERROR",
        message: "サーバーに接続できません。ネットワークをご確認ください。",
      };
    }

    // すでに成形済みのオブジェクトならそのまま返す
    throw err;
  }
}
