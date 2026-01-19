import { describe, it, expect, beforeAll } from 'vitest';
import jwt from 'jsonwebtoken';
import { jwtUtil } from '@/features/auth/utils/jwt';

describe('jwtUtil.createToken', () => {
  beforeAll(() => {
    process.env.JWT_SECRET = 'test-secret';
  });

  it('id と role を含む JWT を生成する', () => {
    const token = jwtUtil.createToken('user-1', 'ADMIN');

    const decoded = jwt.verify(token, 'test-secret') as any;

    expect(decoded.id).toBe('user-1');
    expect(decoded.role).toBe('ADMIN');
  });

  it('有効期限が1時間に設定されている', () => {
    const token = jwtUtil.createToken('u1', 'STUDENT');

    const decoded = jwt.verify(token, 'test-secret') as any;

    const exp = decoded.exp;
    const iat = decoded.iat;

    expect(exp - iat).toBe(60 * 60);
  });
});
