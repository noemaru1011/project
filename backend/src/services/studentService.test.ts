import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StudentService } from './studentService';
import { StudentRepository } from '@/repositories/studentRepository';
import { PrismaClient } from '@prisma/client';

describe('StudentService', () => {
  let studentService: StudentService;
  let mockPrisma: any;
  let mockStudentRepo: any;
  let mockPasswordRepo: any;
  let mockMinorCategoryRepo: any;
  let mockMailer: any;
  let mockPasswordGenerator: any;

  beforeEach(() => {
    // 依存関係をすべてモック化
    mockPrisma = {
      $transaction: vi.fn((callback) => callback(mockPrisma)),
    };
    mockStudentRepo = {
      find: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    mockPasswordRepo = {
      create: vi.fn(),
    };
    mockMinorCategoryRepo = {
      resolveMinorCategoryIds: vi.fn(),
    };
    mockMailer = vi.fn().mockResolvedValue(undefined);
    mockPasswordGenerator = vi.fn().mockReturnValue('temp-password123');

    // モックを注入してインスタンス化
    studentService = new StudentService(
      mockPrisma as any,
      mockStudentRepo as any,
      mockPasswordRepo as any,
      mockMinorCategoryRepo as any,
      mockMailer as any,
      mockPasswordGenerator as any
    );
  });

  describe('getStudent', () => {
    it('学生が存在する場合、StudentResponseを返すこと', async () => {
      // 準備
      const mockDate = new Date();
      mockStudentRepo.find.mockResolvedValue({
        studentId: 'STUDENT001',
        studentName: 'テスト太郎',
        grade: 1,
        departmentId: 10,
        email: 'test@example.com',
        minorCategoryId: 100,
        updatedAt: mockDate,
      });

      // 実行
      const result = await studentService.getStudent('STUDENT001');

      // 検証
      expect(result).toEqual({
        studentId: 'STUDENT001',
        studentName: 'テスト太郎',
        grade: '1',
        departmentId: '10',
        email: 'test@example.com',
        minorCategoryId: '100',
        updatedAt: mockDate.toISOString(),
      });
      expect(mockStudentRepo.find).toHaveBeenCalledWith('STUDENT001');
    });

    it('学生が存在しない場合、nullを返すこと', async () => {
      mockStudentRepo.find.mockResolvedValue(null);

      const result = await studentService.getStudent('UNKNOWN');

      expect(result).toBeNull();
    });
  });
});
