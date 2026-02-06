import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { authMiddleware, requireRole } from './authMiddleware';
import { TokenError, InvalidCredentialsError, ForbiddenError } from '@/errors/authError';
import { tokenBlacklist } from '@/utils/tokenBlacklist';
import { ROLE } from '@shared/models/common';

vi.mock('jsonwebtoken');
vi.mock('@/utils/auth/tokenBlacklist', () => ({
  tokenBlacklist: {
    isBlacklisted: vi.fn(),
  },
}));

const createReq = (token?: string, user?: any) =>
  ({
    cookies: token ? { token } : {},
    user,
  }) as any;

const res = {} as any;
let next: NextFunction;

describe('authMiddleware & requireRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = 'secret';
    next = vi.fn();
  });

  // ======================
  // authMiddleware
  // ======================
  describe('authMiddleware', () => {
    it('token がない場合 TokenError', async () => {
      const req = createReq();

      await authMiddleware(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(TokenError));
    });

    it('JWT が不正な場合 TokenError', async () => {
      (jwt.verify as any).mockImplementation(() => {
        throw new Error();
      });

      const req = createReq('token');

      await authMiddleware(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(TokenError));
    });

    it('ブラックリストに含まれる場合 TokenError', async () => {
      (jwt.verify as any).mockReturnValue({
        id: 1,
        role: ROLE.ADMIN,
      });
      (tokenBlacklist.isBlacklisted as any).mockResolvedValue(true);

      const req = createReq('token');

      await authMiddleware(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(TokenError));
    });

    it('正常時 req.user をセットして next', async () => {
      const payload = {
        id: 1,
        role: ROLE.ADMIN,
      };
      (jwt.verify as any).mockReturnValue(payload);
      (tokenBlacklist.isBlacklisted as any).mockResolvedValue(false);

      const req = createReq('token');

      await authMiddleware(req, res, next);

      expect(req.user).toEqual(payload);
      expect(next).toHaveBeenCalledWith();
    });
  });

  // ======================
  // requireRole
  // ======================
  describe('requireRole', () => {
    it('user がない場合 InvalidCredentialsError', () => {
      const middleware = requireRole([ROLE.ADMIN]);
      const req = createReq(undefined, undefined);

      middleware(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(InvalidCredentialsError));
    });

    it('権限不足の場合 ForbiddenError', () => {
      const middleware = requireRole([ROLE.ADMIN]);
      const req = createReq(undefined, { role: ROLE.STUDENT });

      middleware(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(ForbiddenError));
    });

    it('権限が一致する場合 next が呼ばれる', () => {
      const middleware = requireRole([ROLE.ADMIN]);
      const req = createReq(undefined, { role: ROLE.ADMIN });

      middleware(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });
  });
});
