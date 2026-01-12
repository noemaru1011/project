import { describe, it, expect } from 'vitest';
import { authErrorGenerate } from './authErrorGenerate';
import { APIMESSAGE } from '@shared/constants/apiMessage';

describe('authErrorGenerate', () => {
  it('401ステータスに対して正しいエラーオブジェクトを生成すること', () => {
    const result = authErrorGenerate(401);
    expect(result).toEqual({
      status: 401,
      data: null,
      code: 'TOKEN_ERROR',
      message: APIMESSAGE.TOKEN_ERROR,
    });
  });

  it('403ステータスに対して正しいエラーオブジェクトを生成すること', () => {
    const result = authErrorGenerate(403);
    expect(result).toEqual({
      status: 403,
      data: null,
      code: 'FORBIDDEN',
      message: APIMESSAGE.FORBIDDEN,
    });
  });
});
