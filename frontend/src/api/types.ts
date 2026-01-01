export interface ApiResponse<T> {
  code?: string;
  data?: T;
  message?: string;
  status?: number;
}

export interface ApiErrorResponse {
  status?: number;
  code?: string;
  message?: string;
  redirectTo?: string;
}
