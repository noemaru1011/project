import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { HistoryRepository } from './historyRepository';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const repository = new HistoryRepository(prisma);

describe('HistoryRepository.findOverlappingHistories', () => {
  const targetStudentId = 'test-student-2000';
  // 必須項目用のダミーID（環境に合わせて調整してください）
  const dummyStatusId = 1;

  beforeAll(async () => {
    // Studentの必須項目をすべて埋める
    await prisma.student.upsert({
      where: { studentId: targetStudentId },
      update: {},
      create: {
        studentId: targetStudentId,
        studentName: 'テスト古太郎',
        grade: 1,
        email: 'test@example.com',
        departmentId: 1,
        minorCategoryId: 1,
      },
    });
  });

  beforeEach(async () => {
    // Historyの必須項目 statusId を追加
    await prisma.history.create({
      data: {
        studentId: targetStudentId,
        statusId: dummyStatusId, // 必須項目を追加
        startTime: new Date('2000-01-01T10:00:00Z'),
        endTime: new Date('2000-01-01T12:00:00Z'),
        validFlag: true,
      },
    });
  });

  afterEach(async () => {
    await prisma.history.deleteMany({
      where: { studentId: targetStudentId },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('【重複あり】既存の期間内に完全に含まれる場合', async () => {
    // Arrange (2000/01/01 10:30 - 11:30)
    const start = new Date('2000-01-01T10:30:00Z');
    const end = new Date('2000-01-01T11:30:00Z');

    // Act
    const result = await repository.findOverlappingHistories(targetStudentId, start, end);

    // Assert
    expect(result).toHaveLength(1);
  });

  it('【重複あり】開始時間が既存の終了時間と重なる場合', async () => {
    // Arrange (12:00ちょうどに開始)
    const start = new Date('2000-01-01T12:00:00Z');
    const end = new Date('2000-01-01T13:00:00Z');

    // Act
    const result = await repository.findOverlappingHistories(targetStudentId, start, end);

    // Assert
    expect(result).toHaveLength(1);
  });

  it('【重複なし】既存の終了時間の1秒後から開始する場合', async () => {
    // Arrange (12:00:01から開始)
    const start = new Date('2000-01-01T12:00:01Z');
    const end = new Date('2000-01-01T13:00:00Z');

    // Act
    const result = await repository.findOverlappingHistories(targetStudentId, start, end);

    // Assert
    expect(result).toHaveLength(0);
  });

  it('【重複あり】入力の終了時間がnull（無限）かつ開始時間が既存の期間内の場合', async () => {
    // Arrange (11:00から開始、終了なし)
    const start = new Date('2000-01-01T11:00:00Z');
    const end = null;

    // Act
    const result = await repository.findOverlappingHistories(targetStudentId, start, end);

    // Assert
    expect(result).toHaveLength(1);
  });

  it('【重複あり】既存のendTimeがnull（継続中）で、それより後に開始する場合', async () => {
    // Arrange: 既存データを更新して終了時間を消す
    await prisma.history.updateMany({
      where: { studentId: targetStudentId },
      data: { endTime: null },
    });

    // 既存(10:00〜)に対して 15:00〜16:00
    const start = new Date('2000-01-01T15:00:00Z');
    const end = new Date('2000-01-01T16:00:00Z');

    // Act
    const result = await repository.findOverlappingHistories(targetStudentId, start, end);

    // Assert
    expect(result).toHaveLength(1);
  });
});
