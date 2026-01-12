import { appError } from '@/errors/appError';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessageCode } from '@shared/constants/apiMessage';
///CSRFエラー
export class CsrfError extends appError {
  constructor() {
    const key: ApiMessageCode = 'CSRF_INVALID';
    super(key, APIMESSAGE.CSRF_INVALID, 401);
  }
}
