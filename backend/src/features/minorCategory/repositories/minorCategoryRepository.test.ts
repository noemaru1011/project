import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { MinorCategoryRepository } from './minorCategoryRepository';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const repository = new MinorCategoryRepository(prisma);

describe('MinorCategoryRepository.resolveMinorCategoryIds', () => {
  // テスト全体で使う共通のIDを保持
  let targetCategoryId: number; // 1大隊のID
  let targetSubCategoryId: number; // 11中隊のID
  let targetMinorCategoryId: number; // 111小隊のID

  beforeAll(async () => {
    // Arrange: Seed済みのデータからテストに必要なIDを取得する
    const cat = await prisma.category.findUniqueOrThrow({ where: { categoryName: '1大隊' } });
    const sub = await prisma.subCategory.findUniqueOrThrow({
      where: { subCategoryName: '11中隊' },
    });
    const minor = await prisma.minorCategory.findUniqueOrThrow({
      where: { minorCategoryName: '111小隊' },
    });

    targetCategoryId = cat.categoryId;
    targetSubCategoryId = sub.subCategoryId;
    targetMinorCategoryId = minor.minorCategoryId;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('大隊IDを指定したとき、紐づく全ての中隊の小隊ID（計12個）が返ってくること', async () => {
    // Arrange (1大隊: 中隊4つ × 小隊3つ = 12)
    const input = { categoryIds: [targetCategoryId] };

    // Act
    const result = await repository.resolveMinorCategoryIds(input);

    // Assert
    expect(result).toHaveLength(12);
    // 111小隊が含まれていることを確認
    expect(result).toContain(targetMinorCategoryId);
  });

  it('中隊IDを指定したとき、紐づく3つの小隊IDが返ってくること', async () => {
    // Arrange (11中隊: 111, 112, 113小隊)
    const input = { subCategoryIds: [targetSubCategoryId] };

    // Act
    const result = await repository.resolveMinorCategoryIds(input);

    // Assert
    expect(result).toHaveLength(3);
    // 期待されるパターンのIDが含まれているか（名前から推測）
    const minor111 = await prisma.minorCategory.findUnique({
      where: { minorCategoryName: '111小隊' },
    });
    expect(result).toContain(minor111?.minorCategoryId);
  });

  it('小隊IDを直接指定したとき、そのIDのみが返ってくること', async () => {
    // Arrange
    const input = { minorCategoryIds: [targetMinorCategoryId] };

    // Act
    const result = await repository.resolveMinorCategoryIds(input);

    // Assert
    expect(result).toEqual([targetMinorCategoryId]);
  });

  it('大隊と中隊を混ぜて指定した場合、重複なく正しい和集合が返ること', async () => {
    // Arrange
    // 1大隊(12個) + 2大隊の21中隊(3個) = 15個
    const sub21 = await prisma.subCategory.findUniqueOrThrow({
      where: { subCategoryName: '21中隊' },
    });
    const input = {
      categoryIds: [targetCategoryId],
      subCategoryIds: [sub21.subCategoryId],
    };

    // Act
    const result = await repository.resolveMinorCategoryIds(input);

    // Assert
    expect(result).toHaveLength(15);
  });

  it('入力が全て空または未定義の場合、空配列を返すこと', async () => {
    // Arrange
    const input = { categoryIds: [], subCategoryIds: undefined };

    // Act
    const result = await repository.resolveMinorCategoryIds(input);

    // Assert
    expect(result).toEqual([]);
  });
});
