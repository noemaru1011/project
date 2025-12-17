import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiMessageKey } from '@shared/apiMessage';

//エラーを拡張
export class appError extends Error {
  public code: string;
  public status: number;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

///共通　楽観的ロック違反
export class ConflictError extends appError {
  constructor() {
    const key: ApiMessageKey = 'CONFLICT';
    super(key, APIMESSAGE.CONFLICT, 409);
  }
}
