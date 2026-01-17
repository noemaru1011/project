import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LogoutController } from '../src/features/auth/controllers/logoutController';
import { tokenBlacklist } from '@/utils/auth/tokenBlacklist';
import jwt from 'jsonwebtoken';

vi.mock('@/utils/auth/tokenBlacklist');
vi.mock('jsonwebtoken');

describe('LogoutController', () => {
  let logoutController: LogoutController;
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: any;

  beforeEach(() => {
    vi.clearAllMocks();
    logoutController = new LogoutController();
    mockRequest = {
      cookies: {},
    };
    mockResponse = {
      clearCookie: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    mockNext = vi.fn();
  });

  describe('logout', () => {
    it('トークンが存在する場合、ブラックリストに追加してクッキーをクリアすること', async () => {
      const mockToken = 'mock-token';
      mockRequest.cookies.token = mockToken;
      const now = Math.floor(Date.now() / 1000);
      (jwt.decode as any).mockReturnValue({ exp: now + 3600 });

      await logoutController.logout(mockRequest, mockResponse, mockNext);

      expect(tokenBlacklist.add).toHaveBeenCalledWith(mockToken, expect.any(Number));
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('token', expect.any(Object));
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('role', expect.any(Object));
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('csrf', expect.any(Object));
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('トークンが存在しない場合でも、クッキーをクリアして成功を返すこと', async () => {
      await logoutController.logout(mockRequest, mockResponse, mockNext);

      expect(tokenBlacklist.add).not.toHaveBeenCalled();
      expect(mockResponse.clearCookie).toHaveBeenCalledTimes(3);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('トークンがすでに期限切れの場合、ブラックリストに追加しないこと', async () => {
      mockRequest.cookies.token = 'expired-token';
      const now = Math.floor(Date.now() / 1000);
      (jwt.decode as any).mockReturnValue({ exp: now - 100 });

      await logoutController.logout(mockRequest, mockResponse, mockNext);

      expect(tokenBlacklist.add).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });
});
