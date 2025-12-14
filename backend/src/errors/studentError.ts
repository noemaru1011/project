import { appError } from './appError';
import { APIMESSAGE } from '@/constants/apiMessage';
import type { ApiMessageKey } from '@/constants/apiMessage';

export class NoStudentError extends appError {
  constructor() {
    const key: ApiMessageKey = 'NO_STUDENT';
    super(key, APIMESSAGE.NO_STUDENT, 404);
  }
}

export class EmailDuplicateError extends appError {
  constructor() {
    const key: ApiMessageKey = 'EMAIL_DUPLICATE';
    super(key, APIMESSAGE.EMAIL_DUPLICATE, 400);
  }
}
