import { appError } from './appError';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessageCode } from '@shared/constants/apiMessage';
export class NoStudentError extends appError {
  constructor() {
    const key: ApiMessageCode = 'NO_STUDENT';
    super(key, APIMESSAGE.NO_STUDENT, 404);
  }
}

export class EmailDuplicateError extends appError {
  constructor() {
    const key: ApiMessageCode = 'EMAIL_DUPLICATE';
    super(key, APIMESSAGE.EMAIL_DUPLICATE, 400);
  }
}
