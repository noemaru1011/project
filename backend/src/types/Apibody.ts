import type { ApiMessageKey } from '@shared/apiMessage';

export interface Apibody<T> {
  code: ApiMessageKey;
  data: T;
  message: string;
}
