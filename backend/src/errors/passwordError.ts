import { appError } from './appError';
import { APIMESSAGE } from '@/constants/apiMessage';
import type { ApiMessageKey } from '@/constants/apiMessage';

export class NotMatchPasswordError extends appError {
  constructor() {
    const key: ApiMessageKey = 'NOT_MACTH_PASSWORD';
    super(key, APIMESSAGE.NOT_MACTH_PASSWORD, 400);
  }
}
