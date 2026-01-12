import type { ApiMessageCode, ApiMessage } from '@shared/apiMessage';

export interface Apibody<T> {
  code: ApiMessageCode;
  data: T | null;
  message: ApiMessage;
}
