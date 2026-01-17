import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessageCode, ApiMessage } from '@shared/constants/apiMessage';
//エラーを拡張
export class appError extends Error {
  public code: string;
  public status: number;

  constructor(code: ApiMessageCode, message: ApiMessage, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}
///共通　楽観的ロック違反
export class OptimisticLockError extends appError {
  constructor() {
    super('OPTIMISTIC_LOCK', APIMESSAGE.OPTIMISTIC_LOCK, 409);
  }
}
///共通　FK 制約違反
export class InvalidReferenceError extends appError {
  constructor() {
    super('FOREIGNKEY_COSTRAINT', APIMESSAGE.FOREIGNKEY_COSTRAINT, 400);
  }
}
///共通　リソース未検出
export class NotFoundError extends appError {
  constructor() {
    super('RESOURCE_NOT_FOUND', APIMESSAGE.FOREIGNKEY_COSTRAINT, 404);
  }
}
