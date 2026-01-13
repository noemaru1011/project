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
      searchStudents: vi.fn(),
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

  describe('updateStudent', () => {
    it('正常に学生情報を更新すること', async () => {
      const mockDate = new Date();
      const input = { studentName: '更新後' };
      mockStudentRepo.update.mockResolvedValue({
        studentId: 'STUDENT001',
        studentName: '更新後',
        grade: 2,
        departmentId: 1,
        email: 'test@example.com',
        minorCategoryId: 101,
        updatedAt: mockDate,
      });

      const result = await studentService.updateStudent('STUDENT001', input as any);

      expect(result.studentName).toBe('更新後');
      expect(mockStudentRepo.update).toHaveBeenCalledWith('STUDENT001', input);
    });

    it('更新対象が見つからない場合、ConflictErrorを投げること', async () => {
      mockStudentRepo.update.mockResolvedValue(null);
      await expect(studentService.updateStudent('UNKNOWN', {} as any))
        .rejects.toThrow(); // ConflictError
    });
  });

  describe('deleteStudent', () => {
    it('リポジトリの削除メソッドを呼び出すこと', async () => {
      await studentService.deleteStudent('STUDENT001');
      expect(mockStudentRepo.delete).toHaveBeenCalledWith('STUDENT001');
    });
  });

  describe('searchStudents', () => {
    it('検索結果をDTOに変換して返すこと', async () => {
      const mockStudents = [
        {
          studentId: 1,
          studentName: '学生1',
          grade: 1,
          department: { departmentName: '学科1' },
          minorCategory: { minorCategoryName: '小分類1' },
        },
      ];
      mockMinorCategoryRepo.resolveMinorCategoryIds.mockResolvedValue([101]);
      mockStudentRepo.searchStudents.mockResolvedValue(mockStudents);

      const result = await studentService.searchStudents({} as any);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        studentId: '1',
        studentName: '学生1',
        grade: '1',
        departmentName: '学科1',
        minorCategoryName: '小分類1',
      });
    });
  });
});
