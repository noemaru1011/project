import type { ApiMessageCode, ApiMessage } from "../apiMessage";

export interface Apibody<T> {
  code: ApiMessageCode;
  data: T | null;
  message: ApiMessage;
}

///下記からフロント用
export interface ApiResponse<T> extends Apibody<T> {
  status: number;
}

//レスポンスがない場合やdataが不正なときの用
export interface ApiErrorResponse extends ApiResponse<null> {
  redirectTo?: string;
}
