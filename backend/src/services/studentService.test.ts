import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StudentService } from './studentService';
import { EmailDuplicateError } from '@/errors/studentError';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

vi.mock('bcrypt');

describe('StudentService', () => {
  let studentService: StudentService;
  let mockPrisma: any;
  let mockStudentRepo: any;
  let mockPasswordRepo: any;
  let mockMinorCategoryRepo: any;
  let mockMailer: any;
  let mockPasswordGenerator: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockPrisma = {
      $transaction: vi.fn((callback) => callback(mockPrisma)),
    };
    mockStudentRepo = {
      find: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      withTransaction: vi.fn().mockReturnThis(),
    };
    mockPasswordRepo = {
      create: vi.fn(),
      withTransaction: vi.fn().mockReturnThis(),
    };
    mockMinorCategoryRepo = {
      resolveMinorCategoryIds: vi.fn(),
    };
    mockMailer = vi.fn().mockResolvedValue(undefined);
    mockPasswordGenerator = vi.fn().mockReturnValue('temp-password123');

    studentService = new StudentService(
      mockPrisma as any,
      mockStudentRepo as any,
      mockPasswordRepo as any,
      mockMinorCategoryRepo as any,
      mockMailer as any,
      mockPasswordGenerator as any
    );
  });

  describe('createStudent', () => {
    it('正常に学生を作成し、メールを送信すること', async () => {
      // 準備
      const input = {
        studentName: 'テスト学生',
        email: 'test@example.com',
        grade: 1,
        departmentId: 1,
        minorCategoryId: 101,
      };
      const mockDate = new Date();
      const mockCreatedStudent = {
        studentId: 'STUDENT001',
        ...input,
        createdAt: mockDate,
        updatedAt: mockDate,
      };

      mockStudentRepo.create.mockResolvedValue(mockCreatedStudent);
      (bcrypt.hash as any).mockResolvedValue('hashed-password');

      // 実行
      const result = await studentService.createStudent(input as any);

      // 検証
      expect(mockPasswordGenerator).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith('temp-password123', 10);
      expect(mockPrisma.$transaction).toHaveBeenCalled();
      expect(mockStudentRepo.create).toHaveBeenCalledWith(input);
      expect(mockPasswordRepo.create).toHaveBeenCalledWith({
        studentId: 'STUDENT001',
        password: 'hashed-password',
      });
      expect(mockMailer).toHaveBeenCalledWith('test@example.com', 'temp-password123');
      expect(result).toEqual({
        studentId: 'STUDENT001',
        studentName: 'テスト学生',
        grade: '1',
        departmentId: '1',
        email: 'test@example.com',
        minorCategoryId: '101',
        createdAt: mockDate.toISOString(),
        updatedAt: mockDate.toISOString(),
      });
    });

    it('メールアドレスが重複している場合、EmailDuplicateErrorを投げること', async () => {
      const input = { email: 'duplicate@example.com' };
      
      // PrismaのKnownRequestErrorを模倣するエラーオブジェクト
      const prismaError = new Error('Prisma error') as any;
      prismaError.code = 'P2002';
      prismaError.meta = { target: ['email'] };

      mockPrisma.$transaction.mockRejectedValue(prismaError);

      await expect(studentService.createStudent(input as any))
        .rejects.toThrow(EmailDuplicateError);
    });
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
