import { appError } from './appError';
import { APIMESSAGE } from '@shared/constants/apiMessage';
export class NotMatchPasswordError extends appError {
  constructor() {
    super('NOT_MACTH_PASSWORD', APIMESSAGE.NOT_MACTH_PASSWORD, 400);
  }
}
