import { appError } from './appError';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessageCode } from '@shared/constants/apiMessage';

export class EmailDuplicateError extends appError {
  constructor() {
    const key: ApiMessageCode = 'EMAIL_DUPLICATE';
    super(key, APIMESSAGE.EMAIL_DUPLICATE, 400);
  }
}
