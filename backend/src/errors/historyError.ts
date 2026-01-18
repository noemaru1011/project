import { appError } from './appError';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessage } from '@shared/constants/apiMessage';

export class StatusDuplicateError extends appError {
  constructor(details: string) {
    const safeDetails = details ?? '';
    const message = APIMESSAGE.STATUS_DUPLICATE.replace('{details}', safeDetails);

    super('STATUS_DUPLICATE', message as ApiMessage, 400);
  }
}
