import { appError } from './appError';
import { APIMESSAGE } from '@/constants/apiMessage';

///ログイン失敗敗
export class InvalidCredentialsError extends appError {
  constructor() {
    super('INVALID_CREDENTIALS', APIMESSAGE.INVALID_CREDENTIALS, 401);
  }
}

///権限がない場合
export class ForbiddenError extends appError {
  constructor() {
    super('FORBIDDEN', APIMESSAGE.FORBIDDEN, 403);
  }
}

///トークンが期切れ、もしくはトークンなしなど、トークン系のエラー
export class TokenError extends appError {
  constructor() {
    super('TOKEN_ERROR', APIMESSAGE.TOKEN_ERROR, 401);
  }
}
