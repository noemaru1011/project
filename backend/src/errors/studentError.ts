import { appError } from './appError';
import { APIMESSAGE } from '@/constants/apiMessage';

export class NoStudentError extends appError {
  constructor() {
    super('NO_STUDENT', APIMESSAGE.NO_STUDENT, 404);
  }
}

export class EmailDuplicateError extends appError {
  constructor() {
    super('EMAIL_DUPLICATE', APIMESSAGE.EMAIL_DUPLICATE, 400);
  }
}
