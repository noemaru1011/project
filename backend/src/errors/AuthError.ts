import { appError } from '@/errors/appError';
import { APIMESSAGE } from '@shared/apiMessage';
import type { ApiMessageKey } from '@shared/apiMessage';

///ログイン失敗敗
export class InvalidCredentialsError extends appError {
  constructor() {
    const key: ApiMessageKey = 'INVALID_CREDENTIALS';
    super(key, APIMESSAGE.INVALID_CREDENTIALS, 401);
  }
}

///権限がない場合
export class ForbiddenError extends appError {
  constructor() {
    const key: ApiMessageKey = 'FORBIDDEN';
    super(key, APIMESSAGE.FORBIDDEN, 403);
  }
}

///トークンが期切れ、もしくはトークンなしなど、トークン系のエラー
export class TokenError extends appError {
  constructor() {
    const key: ApiMessageKey = 'TOKEN_ERROR';
    super(key, APIMESSAGE.TOKEN_ERROR, 401);
  }
}
