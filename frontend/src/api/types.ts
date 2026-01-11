//レスポンスがないパターンなどがあるためバックエンドと分ける
export interface ApiResponse<T> {
  code?: string;
  data?: T;
  message?: string;
  status?: number;
}

//レスポンスがない場合やdataが不正なときの用
export interface ApiErrorResponse {
  status?: number;
  code?: string;
  message?: string;
  redirectTo?: string;
}
