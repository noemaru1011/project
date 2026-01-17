import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginService } from '../features/auth/services/loginService';
import bcrypt from 'bcrypt';
import { jwtUtil } from '@/utils/auth/jwt';
import { ROLE } from '@shared/models/common';
import { InvalidCredentialsError } from '@/errors/authError';

// bcryptとjwtUtilをモック化
vi.mock('bcrypt');
vi.mock('@/utils/auth/jwt');

describe('LoginService', () => {
  let loginService: LoginService;
  let mockAdminRepo: any;
  let mockStudentRepo: any;
  let mockPasswordRepo: any;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';

    mockAdminRepo = {
      findByEmail: vi.fn(),
    };
    mockStudentRepo = {
      findByEmail: vi.fn(),
    };
    mockPasswordRepo = {
      findByStudentId: vi.fn(),
    };

    loginService = new LoginService(mockAdminRepo, mockStudentRepo, mockPasswordRepo);
  });

  describe('login', () => {
    it('管理者が正しいパスワードでログインできること', async () => {
      const mockAdmin = { adminId: 'admin1', email: 'admin@test.com', password: 'hashed_password' };
      mockAdminRepo.findByEmail.mockResolvedValue(mockAdmin);
      mockStudentRepo.findByEmail.mockResolvedValue(null);
      (bcrypt.compare as any).mockResolvedValue(true);
      (jwtUtil.createToken as any).mockReturnValue('mock-token');

      const result = await loginService.login('admin@test.com', 'password123');

      expect(result).toEqual({ token: 'mock-token', role: ROLE.ADMIN });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed_password');
      expect(jwtUtil.createToken).toHaveBeenCalledWith('admin1', ROLE.ADMIN);
    });

    it('学生が正しいパスワードでログインできること', async () => {
      const mockStudent = { studentId: 'student1', email: 'student@test.com' };
      const now = new Date();
      const mockPassword = {
        password: 'hashed_password',
        createdAt: now,
        updatedAt: now,
      };

      mockAdminRepo.findByEmail.mockResolvedValue(null);
      mockStudentRepo.findByEmail.mockResolvedValue(mockStudent);
      mockPasswordRepo.findByStudentId.mockResolvedValue(mockPassword);
      (bcrypt.compare as any).mockResolvedValue(true);
      (jwtUtil.createToken as any).mockReturnValue('mock-token');

      const result = await loginService.login('student@test.com', 'password123');

      expect(result).toEqual({
        token: 'mock-token',
        role: ROLE.STUDENT,
        passwordUpdateRequired: true, // createdAt === updatedAt なので true
      });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed_password');
      expect(jwtUtil.createToken).toHaveBeenCalledWith('student1', ROLE.STUDENT);
    });

    it('存在しないメールアドレスの場合、InvalidCredentialsErrorを投げること', async () => {
      mockAdminRepo.findByEmail.mockResolvedValue(null);
      mockStudentRepo.findByEmail.mockResolvedValue(null);
      (bcrypt.compare as any).mockResolvedValue(false);

      await expect(loginService.login('wrong@test.com', 'pass')).rejects.toThrow(
        InvalidCredentialsError,
      );

      // タイミング攻撃対策のため、bcrypt.compare が呼ばれていることを確認
      expect(bcrypt.compare).toHaveBeenCalled();
    });

    it('管理者のパスワードが間違っている場合、InvalidCredentialsErrorを投げること', async () => {
      const mockAdmin = { adminId: 'admin1', email: 'admin@test.com', password: 'hashed_password' };
      mockAdminRepo.findByEmail.mockResolvedValue(mockAdmin);
      (bcrypt.compare as any).mockResolvedValue(false);

      await expect(loginService.login('admin@test.com', 'wrong_pass')).rejects.toThrow(
        InvalidCredentialsError,
      );
    });

    it('学生のパスワードが間違っている場合、InvalidCredentialsErrorを投げること', async () => {
      const mockStudent = { studentId: 'student1', email: 'student@test.com' };
      const mockPassword = { password: 'hashed_password' };
      mockAdminRepo.findByEmail.mockResolvedValue(null);
      mockStudentRepo.findByEmail.mockResolvedValue(mockStudent);
      mockPasswordRepo.findByStudentId.mockResolvedValue(mockPassword);
      (bcrypt.compare as any).mockResolvedValue(false);

      await expect(loginService.login('student@test.com', 'wrong_pass')).rejects.toThrow(
        InvalidCredentialsError,
      );
    });
  });
});
