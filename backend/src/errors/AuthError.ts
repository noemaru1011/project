import { appError } from '@/errors/appError';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { ApiMessageCode } from '@shared/constants/apiMessage';
///ログイン失敗敗
export class InvalidCredentialsError extends appError {
  constructor() {
    const key: ApiMessageCode = 'INVALID_CREDENTIALS';
    super(key, APIMESSAGE.INVALID_CREDENTIALS, 401);
  }
}

///権限がない場合
export class ForbiddenError extends appError {
  constructor() {
    const key: ApiMessageCode = 'FORBIDDEN';
    super(key, APIMESSAGE.FORBIDDEN, 403);
  }
}

///トークンが期切れ、もしくはトークンなしなど、トークン系のエラー
export class TokenError extends appError {
  constructor() {
    const key: ApiMessageCode = 'TOKEN_ERROR';
    super(key, APIMESSAGE.TOKEN_ERROR, 401);
  }
}
