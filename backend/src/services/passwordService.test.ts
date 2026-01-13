import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PasswordService } from './passwordService';
import bcrypt from 'bcrypt';
import { NoStudentError } from '@/errors/studentError';
import { NotMatchPasswordError } from '@/errors/passwordError';

vi.mock('bcrypt');

describe('PasswordService', () => {
  let passwordService: PasswordService;
  let mockPasswordRepo: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockPasswordRepo = {
      findByStudentId: vi.fn(),
      update: vi.fn(),
    };
    passwordService = new PasswordService(mockPasswordRepo);
  });

  describe('updatePassword', () => {
    const mockInput = {
      oldPassword: 'old-pass',
      newPassword: 'new-pass',
      checkNewPassword: 'new-pass',
    };

    it('正しい旧パスワードであれば、新パスワードをハッシュ化して更新すること', async () => {
      mockPasswordRepo.findByStudentId.mockResolvedValue({ studentId: 's1', password: 'hashed-old-pass' });
      (bcrypt.compare as any).mockResolvedValue(true);
      (bcrypt.hash as any).mockResolvedValue('hashed-new-pass');

      await passwordService.updatePassword(mockInput, 's1');

      expect(mockPasswordRepo.findByStudentId).toHaveBeenCalledWith('s1');
      expect(bcrypt.compare).toHaveBeenCalledWith('old-pass', 'hashed-old-pass');
      expect(bcrypt.hash).toHaveBeenCalledWith('new-pass', 10);
      expect(mockPasswordRepo.update).toHaveBeenCalledWith('s1', 'hashed-new-pass');
    });

    it('学生が存在しない場合、NoStudentErrorを投げること', async () => {
      mockPasswordRepo.findByStudentId.mockResolvedValue(null);

      await expect(passwordService.updatePassword(mockInput, 'unknown'))
        .rejects.toThrow(NoStudentError);
    });

    it('旧パスワードが一致しない場合、NotMatchPasswordErrorを投げること', async () => {
      mockPasswordRepo.findByStudentId.mockResolvedValue({ studentId: 's1', password: 'hashed-old-pass' });
      (bcrypt.compare as any).mockResolvedValue(false);

      await expect(passwordService.updatePassword(mockInput, 's1'))
        .rejects.toThrow(NotMatchPasswordError);
    });
  });
});
