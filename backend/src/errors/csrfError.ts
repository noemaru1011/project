import { appError } from '@/errors/appError';
import { APIMESSAGE } from '@shared/constants/apiMessage';
///CSRFエラー
export class CsrfError extends appError {
  constructor() {
    super('CSRF_INVALID', APIMESSAGE.CSRF_INVALID, 401);
  }
}
