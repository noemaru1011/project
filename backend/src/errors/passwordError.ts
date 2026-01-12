import { appError } from './appError';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessageCode } from '@shared/constants/apiMessage';
export class NotMatchPasswordError extends appError {
  constructor() {
    const key: ApiMessageCode = 'NOT_MACTH_PASSWORD';
    super(key, APIMESSAGE.NOT_MACTH_PASSWORD, 400);
  }
}
