import { appError } from './appError';
import { apiMessage } from '@/constants/apiMessage';

export class NoStudentError extends appError {
  constructor() {
    super('NO_STUDENT', apiMessage.NO_STUDENT, 404);
  }
}

export class EmailDuplicateError extends appError {
  constructor() {
    super('EMAIL_DUPLICATE', apiMessage.EMAIL_DUPLICATE, 400);
  }
}
