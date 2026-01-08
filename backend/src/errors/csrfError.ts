import { appError } from '@/errors/appError';
import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiMessageKey } from '@shared/apiMessage';

///CSRFエラー
export class CsrfError extends appError {
  constructor() {
    const key: ApiMessageKey = 'CSRF_INVALID';
    super(key, APIMESSAGE.CSRF_INVALID, 401);
  }
}
