import type { ApiResponse } from '@/types/apiResponse';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * バックエンドAPIを呼び出す汎用関数
 * @param path - APIエンドポイント
 * @param options - fetchのオプション
 */
export async function Api<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      ...options,
    });

    // レスポンスをJSONでパース。失敗したら空オブジェクト
    const json = await res.json().catch(() => ({}));

    const response: ApiResponse<T> = {
      code: json.code,
      data: json.data,
      message: json.message || json.error || '予期せぬエラーが発生しました',
    };
    console.log('API Response:', response);

    // HTTPステータスでokでない場合はthrow
    if (!res.ok) {
      throw { ...response, status: res.status };
    }

    return { ...response, status: res.status };
  } catch (err: any) {
    if (err instanceof TypeError) {
      // ネットワーク接続エラー
      throw {
        status: 0,
        message: 'サーバーに接続できません。ネットワークをご確認ください。',
      } as ApiResponse<null>;
    }

    // すでにApiResponse<T>の形ならそのままthrow
    throw err;
  }
}
