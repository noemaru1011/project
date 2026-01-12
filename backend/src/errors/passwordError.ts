import { appError } from './appError';
import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiMessageCode } from '@shared/apiMessage';

export class NotMatchPasswordError extends appError {
  constructor() {
    const key: ApiMessageCode = 'NOT_MACTH_PASSWORD';
    super(key, APIMESSAGE.NOT_MACTH_PASSWORD, 400);
  }
}
