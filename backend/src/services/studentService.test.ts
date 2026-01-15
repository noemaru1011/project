import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StudentService } from './studentService';
import { EmailDuplicateError } from '@/errors/studentError';
import { InvalidReferenceError } from '@/errors/appError';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

describe('createStudent', () => {
  let service: StudentService;

  // 6つの依存関係のモック
  const prismaMock = {
    $transaction: vi.fn(),
  };
  const studentRepoMock = {
    withTransaction: vi.fn().mockReturnThis(),
    create: vi.fn(),
  };
  const passwordRepoMock = {
    withTransaction: vi.fn().mockReturnThis(),
    create: vi.fn(),
  };
  const departmentRepoMock = {
    withTransaction: vi.fn().mockReturnThis(),
  };
  const minorCategoryRepoMock = {
    withTransaction: vi.fn().mockReturnThis(),
  };
  const mailerMock = vi.fn(); // サービスとして注入されている場合

  beforeEach(() => {
    vi.clearAllMocks();

    // 1. コンストラクタに6つのモックを渡す
    service = new StudentService(
      prismaMock as any,
      studentRepoMock as any,
      passwordRepoMock as any,
      departmentRepoMock as any,
      minorCategoryRepoMock as any,
      mailerMock as any,
    );

    // 内部で使われる外部ライブラリや関数のモック
    vi.spyOn(bcrypt, 'hash').mockResolvedValue('hashed_password' as never);

    // クラス内メソッド (passwordGenerator) のモック
    (service as any).passwordGenerator = vi.fn().mockReturnValue('plain_password');

    // mailerがクラス内メソッドの場合のモック (DIではなく内部実装の場合)
    (service as any).mailer = vi.fn().mockResolvedValue(undefined);
  });

  // --- 外部キー制約違反 (P2003) のテスト ---
  it('存在しないdepartmentId等を指定した場合、InvalidReferenceErrorを投げること', async () => {
    // Prismaのエラーを再現
    const foreignKeyError = new Prisma.PrismaClientKnownRequestError(
      'Foreign key constraint failed',
      {
        code: 'P2003',
        clientVersion: '5.x',
        meta: { target: ['departmentId'] },
      },
    );

    // トランザクションが失敗するように設定
    prismaMock.$transaction.mockRejectedValue(foreignKeyError);

    const data = {
      studentName: 'テスト太郎',
      email: 'test@example.com',
      grade: 1,
      departmentId: 999, // 不正なID
      minorCategoryId: 1,
    };

    // 実行と検証
    await expect(service.createStudent(data as any)).rejects.toThrow(InvalidReferenceError);

    // メール送信が呼ばれていないことも確認
    expect((service as any).mailer).not.toHaveBeenCalled();
  });

  // --- ユニーク制約違反 (P2002) のテスト ---
  it('メールアドレスが重複している場合、EmailDuplicateErrorを投げること', async () => {
    const duplicateError = new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
      code: 'P2002',
      clientVersion: '5.x',
      meta: { target: ['email'] },
    });

    prismaMock.$transaction.mockRejectedValue(duplicateError);

    const data = {
      studentName: '重複太郎',
      email: 'already@exists.com',
      grade: 1,
      departmentId: 1,
      minorCategoryId: 1,
    };

    await expect(service.createStudent(data as any)).rejects.toThrow(EmailDuplicateError);
  });

  // --- 正常系のテスト ---
  it('正常なデータの場合、学生情報を返し、メールを送信すること', async () => {
    const mockStudent = {
      studentId: 1,
      studentName: '成功太郎',
      email: 'success@example.com',
      grade: 1,
      departmentId: 1,
      minorCategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // トランザクションが成功して学生データを返すように設定
    prismaMock.$transaction.mockResolvedValue(mockStudent);

    const data = {
      studentName: '成功太郎',
      email: 'success@example.com',
      grade: 1,
      departmentId: 1,
      minorCategoryId: 1,
    };

    const result = await service.createStudent(data as any);

    // 検証
    expect(result.studentName).toBe('成功太郎');
    expect((service as any).mailer).toHaveBeenCalledWith('success@example.com', 'plain_password');
  });
});
