import { ROUTES } from '@/routes/routes';
import { toast } from 'react-toastify';
import type { NavigateFunction } from 'react-router-dom';
import type { ApiResponse, ApiErrorResponse } from '@shared/models/common';
import type { ApiMessageCode } from '@shared/constants/apiMessage';
import { APIMESSAGE } from '@shared/constants/apiMessage';
//ネットワーク切断、バグ（undefined参照）、JSON parse errorなどを500番にマッピング
const isApiResponse = (err: unknown): err is ApiResponse<unknown> => {
  return typeof err === 'object' && err !== null && 'status' in err && 'message' in err;
};

//バックエンドのエラーを、フロントエンドで扱いやすい形に変換する
//また、画面遷移が必要な場合はredirectToに遷移先をセットする
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

//UI表示も含めたエラーハンドリング
export const handleApiErrorWithUI = (err: unknown, navigate: NavigateFunction) => {
  const error = handleApiError(err);

  toast.error(error.message);

  if (error.redirectTo) {
    navigate(error.redirectTo);
  }

  return error;
};
