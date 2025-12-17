import { appError } from './appError';
import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiMessageKey } from '@shared/apiMessage';

export class NotMatchPasswordError extends appError {
  constructor() {
    const key: ApiMessageKey = 'NOT_MACTH_PASSWORD';
    super(key, APIMESSAGE.NOT_MACTH_PASSWORD, 400);
  }
}
