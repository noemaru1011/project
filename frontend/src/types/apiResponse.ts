export type ApiResponse<T> = {
  code?: string;
  data?: T;
  message: string;
  status?: number;
};
