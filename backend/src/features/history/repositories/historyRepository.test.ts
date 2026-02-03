import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { HistoryRepository } from './historyRepository';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const repository = new HistoryRepository(prisma);

describe('HistoryRepository.findOverlappingHistories', () => {
  const targetStudentId = 'test-student-2000';
  const dummyStatusId = 1;
  let existingHistoryId: string; // beforeEach で作った ID を保持する

  beforeAll(async () => {
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
    // 既存データの作成と ID の保存
    const history = await prisma.history.create({
      data: {
        studentId: targetStudentId,
        statusId: dummyStatusId,
        startTime: new Date('2000-01-01T10:00:00Z'),
        endTime: new Date('2000-01-01T12:00:00Z'),
        validFlag: true,
      },
    });
    existingHistoryId = history.historyId;
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
    // Arrange
    const start = new Date('2000-01-01T10:30:00Z');
    const end = new Date('2000-01-01T11:30:00Z');

    // Act (excludeHistoryId は指定しない)
    const result = await repository.findOverlappingHistories(targetStudentId, start, end);

    // Assert
    expect(result).toHaveLength(1);
  });

  it('【除外設定】重複する時間でも自分の ID を指定すれば重複なしとなること', async () => {
    // Arrange (既存データと全く同じ時間)
    const start = new Date('2000-01-01T10:00:00Z');
    const end = new Date('2000-01-01T12:00:00Z');

    // Act (自分の ID を除外対象に指定)
    const result = await repository.findOverlappingHistories(
      targetStudentId,
      start,
      end,
      existingHistoryId,
    );

    // Assert
    expect(result).toHaveLength(0);
  });

  it('【重複あり】開始時間が既存の終了時間と重なる場合', async () => {
    // Arrange
    const start = new Date('2000-01-01T12:00:00Z');
    const end = new Date('2000-01-01T13:00:00Z');

    // Act
    const result = await repository.findOverlappingHistories(targetStudentId, start, end);

    // Assert
    expect(result).toHaveLength(1);
  });

  it('【重複なし】既存の終了時間の1秒後から開始する場合', async () => {
    // Arrange
    const start = new Date('2000-01-01T12:00:01Z');
    const end = new Date('2000-01-01T13:00:00Z');

    // Act
    const result = await repository.findOverlappingHistories(targetStudentId, start, end);

    // Assert
    expect(result).toHaveLength(0);
  });

  it('【重複あり】入力の終了時間がnull（無限）かつ開始時間が既存の期間内の場合', async () => {
    // Arrange
    const start = new Date('2000-01-01T11:00:00Z');
    const end = null;

    // Act
    const result = await repository.findOverlappingHistories(targetStudentId, start, end);

    // Assert
    expect(result).toHaveLength(1);
  });

  it('【重複あり】既存のendTimeがnull（継続中）で、それより後に開始する場合', async () => {
    // Arrange
    await prisma.history.update({
      where: { historyId: existingHistoryId },
      data: { endTime: null },
    });
    const start = new Date('2000-01-01T15:00:00Z');
    const end = new Date('2000-01-01T16:00:00Z');

    // Act
    const result = await repository.findOverlappingHistories(targetStudentId, start, end);

    // Assert
    expect(result).toHaveLength(1);
  });
});
