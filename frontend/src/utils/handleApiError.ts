import { ROUTES } from '@/routes/routes';
import type { ApiResponse, ApiErrorResponse } from '@shared/models/common';
import type { ApiMessageCode } from '@shared/constants/apiMessage';
import { APIMESSAGE } from '@shared/constants/apiMessage';
//ネットワーク切断、バグ（undefined参照）、JSON parse errorなどを500番にマッピング
const isApiResponse = (err: unknown): err is ApiResponse<unknown> => {
  return typeof err === 'object' && err !== null && 'status' in err && 'message' in err;
};

//バックエンドのエラーを、フロントエンドのUI制御に変換する関数
export const handleApiError = (err: unknown): ApiErrorResponse => {
  if (!isApiResponse(err)) {
    const key: ApiMessageCode = 'INTERNAL_SERVER_ERROR';
    return {
      status: 500,
      code: key,
      data: null,
      message: APIMESSAGE.INTERNAL_SERVER_ERROR,
      redirectTo: ROUTES.ERROR.SERVER,
    };
  }

  const status = err.status ?? 0;
  const data = null;
  const code = err.code;
  const message = err.message ?? APIMESSAGE.INTERNAL_SERVER_ERROR;

  switch (status) {
    case 400:
      return { status, data, code, message };

    case 401:
      //ログイン失敗時は、その場でメッセージを出す
      const key: ApiMessageCode = 'INVALID_CREDENTIALS';
      if (code === key) {
        return { status, data, code, message };
      }
      return { status, data, code, message, redirectTo: ROUTES.AUTH.LOGIN };

    case 403:
      return { status, data, code, message, redirectTo: ROUTES.ERROR.FORBIDDEN };

    case 404:
      return { status, data, code, message, redirectTo: ROUTES.ERROR.NOTFOUND };

    default:
      if (status >= 500 || status === 0) {
        return { status, data, code, message, redirectTo: ROUTES.ERROR.SERVER };
      }
      return { status, data, code, message };
  }
};
