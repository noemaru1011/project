import type { ApiMessageCode, ApiMessage } from '@shared/apiMessage';

//レスポンスがないパターンなどがあるためバックエンドと分ける
export interface ApiResponse<T> {
  code?: ApiMessageCode;
  data?: T;
  message?: ApiMessage;
  status?: number;
}

//レスポンスがない場合やdataが不正なときの用
export interface ApiErrorResponse {
  status?: number;
  code?: ApiMessageCode;
  message?: ApiMessage;
  redirectTo?: string;
}
