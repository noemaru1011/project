import type { ApiResponse } from '@/interface/apiResponse';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * バックエンドAPIを呼び出す汎用関数
 * @param path - APIエンドポイント
 * @param options - fetchのオプション
 * @returns - ApiResponse<T>でdataの中身を指定
 */
export async function api<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  let res: Response;

  try {
    // 【意図①】
    // fetch自体が失敗するのは「ネットワークエラー」のみ
    // ここで捕まえることで「通信できなかった」ケースを明確に分離する
    res = await fetch(`${API_BASE_URL}${path}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      ...options,
    });
  } catch {
    // 【意図②】
    // HTTPレスポンス以前の失敗（DNS / CORS / サーバーダウン等）
    // status=0 としてアプリ全体で特別扱いしやすくする
    throw {
      status: 0,
      message: 'サーバーに接続できません。ネットワークをご確認ください。',
    };
  }

  let json: any = null;

  try {
    // 【意図③】
    // 常に res.json() を呼ぶと 204 No Content や
    // 非JSONレスポンスで例外が出るため、
    // Content-Type を見てから JSON をパースする
    const contentType = res.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      json = await res.json();
    }
  } catch {
    // 【意図④】
    // JSONとして壊れていた場合でも
    // fetchの責務外なのでここでは落とさない
    json = null;
  }

  // 【意図⑤】
  // ApiResponse は「業務的なレスポンス表現」
  // HTTPステータスとは概念的に分離して扱う
  const response: ApiResponse<T> = {
    code: json?.code,
    data: json?.data,
    message: json?.message,
    status: res.status,
  };
  console.log(response);

  // 【意図⑥】
  // HTTP的に失敗している場合は throw して
  // 呼び出し元の try/catch に制御を委ねる
  if (!res.ok) {
    throw {
      status: res.status,
      code: response.code,
      message: response.message ?? 'APIエラーが発生しました',
    };
  }

  // 【意図⑦】
  // 成功時のみ ApiResponse<T> を返す
  return response;
}
