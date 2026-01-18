import { appError } from './appError';
import { APIMESSAGE } from '@shared/constants/apiMessage';

export class EmailDuplicateError extends appError {
  constructor() {
    super('EMAIL_DUPLICATE', APIMESSAGE.EMAIL_DUPLICATE, 400);
  }
}
