import { describe, it, expect } from 'vitest';
import { handleApiError } from './handleApiError';
import { ROUTES } from '@/routes/routes';
import { APIMESSAGE } from '@shared/apiMessage';

describe('handleApiError', () => {
  it('ApiResponse形式でないエラーを500エラーとして処理すること', () => {
    const error = new Error('Unexpected error');
    const result = handleApiError(error);
    expect(result).toEqual({
      status: 500,
      message: APIMESSAGE.INTERNAL_SERVER_ERROR,
      redirectTo: ROUTES.ERROR.SERVER,
    });
  });

  it('400エラーの場合、リダイレクト先なしで返すこと', () => {
    const apiError = {
      status: 400,
      code: 'VALIDATE_ERROR',
      message: 'Validation failed',
    };
    const result = handleApiError(apiError);
    expect(result).toEqual({
      status: 400,
      code: 'VALIDATE_ERROR',
      message: 'Validation failed',
    });
  });

  it('401エラーかつ INVALID_CREDENTIALS の場合、リダイレクト先なしで返すこと', () => {
    const apiError = {
      status: 401,
      code: 'INVALID_CREDENTIALS',
      message: 'Invalid email or password',
    };
    const result = handleApiError(apiError);
    expect(result).toEqual({
      status: 401,
      code: 'INVALID_CREDENTIALS',
      message: 'Invalid email or password',
    });
  });

  it('401エラーかつ TOKEN_ERROR の場合、ログイン画面へのリダイレクトを返すこと', () => {
    const apiError = {
      status: 401,
      code: 'TOKEN_ERROR',
      message: 'Session expired',
    };
    const result = handleApiError(apiError);
    expect(result).toEqual({
      status: 401,
      code: 'TOKEN_ERROR',
      message: 'Session expired',
      redirectTo: ROUTES.AUTH.LOGIN,
    });
  });

  it('403エラーの場合、403エラー画面へのリダイレクトを返すこと', () => {
    const apiError = {
      status: 403,
      code: 'FORBIDDEN',
      message: 'Forbidden access',
    };
    const result = handleApiError(apiError);
    expect(result).toEqual({
      status: 403,
      code: 'FORBIDDEN',
      message: 'Forbidden access',
      redirectTo: ROUTES.ERROR.FORBIDDEN,
    });
  });

  it('404エラーの場合、Not Found画面へのリダイレクトを返すこと', () => {
    const apiError = {
      status: 404,
      code: 'NOT_FOUND',
      message: 'Not found',
    };
    const result = handleApiError(apiError);
    expect(result).toEqual({
      status: 404,
      code: 'NOT_FOUND',
      message: 'Not found',
      redirectTo: ROUTES.ERROR.NOTFOUND,
    });
  });

  it('500以上のエラーまたはステータス0の場合、サーバーエラー画面へのリダイレクトを返すこと', () => {
    const apiError = {
      status: 503,
      code: 'SERVICE_UNAVAILABLE',
      message: 'Service unavailable',
    };
    const result = handleApiError(apiError);
    expect(result).toEqual({
      status: 503,
      code: 'SERVICE_UNAVAILABLE',
      message: 'Service unavailable',
      redirectTo: ROUTES.ERROR.SERVER,
    });

    const networkError = {
      status: 0,
      message: 'Network error',
    };
    expect(handleApiError(networkError)).toEqual({
      status: 0,
      code: undefined,
      message: 'Network error',
      redirectTo: ROUTES.ERROR.SERVER,
    });
  });
});

