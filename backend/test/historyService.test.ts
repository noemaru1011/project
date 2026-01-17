import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HistoryService } from '../src/features/history/service/historyService';
import { formatDateTime } from '../src//utils/common/formatDateTime';

describe('HistoryService', () => {
  let historyService: HistoryService;
  let mockHistoryRepo: any;
  let mockMinorCategoryRepo: any;

  beforeEach(() => {
    mockHistoryRepo = {
      find: vi.fn(),
      searchHistories: vi.fn(),
      searchByStartTimeHistories: vi.fn(),
      createHistory: vi.fn(),
      updateHistory: vi.fn(),
      deleteHistory: vi.fn(),
    };
    mockMinorCategoryRepo = {
      resolveMinorCategoryIds: vi.fn(),
    };

    historyService = new HistoryService(mockHistoryRepo, mockMinorCategoryRepo);
  });

  describe('searchHistories', () => {
    it('検索条件に基づき、整形された履歴一覧を返すこと', async () => {
      // 準備
      const searchInput = { departmentIds: [1], grades: [1] };
      const mockMinorIds = [101, 102];
      const mockHistories = [
        {
          historyId: 'h1',
          student: {
            studentName: 'テスト学生',
            grade: 1,
            department: { departmentName: '普通科' },
            minorCategory: {
              minorCategoryName: '1小隊',
              subCategory: {
                subCategoryName: '1中隊',
                category: { categoryName: '1大隊' },
              },
            },
          },
          status: { statusName: '外出' },
          other: '備考',
          startTime: new Date('2026-01-13T10:00:00Z'),
          endTime: new Date('2026-01-13T18:00:00Z'),
        },
      ];

      mockMinorCategoryRepo.resolveMinorCategoryIds.mockResolvedValue(mockMinorIds);
      mockHistoryRepo.searchHistories.mockResolvedValue(mockHistories);

      // 実行
      const result = await historyService.searchHistories(searchInput as any);

      // 検証
      expect(mockMinorCategoryRepo.resolveMinorCategoryIds).toHaveBeenCalledWith(searchInput);
      expect(mockHistoryRepo.searchHistories).toHaveBeenCalledWith({
        minorCategoryIds: mockMinorIds,
        departmentIds: [1],
        grades: [1],
      });
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        historyId: 'h1',
        studentName: 'テスト学生',
        grade: '1',
        departmentName: '普通科',
        minorCategoryName: '1小隊',
        statusName: '外出',
        other: '備考',
        startTime: formatDateTime(mockHistories[0].startTime),
        endTime: formatDateTime(mockHistories[0].endTime),
      });
    });
  });

  describe('getHistory', () => {
    it('指定したIDの履歴が存在する場合、整形して返すこと', async () => {
      const mockDate = new Date();
      mockHistoryRepo.find.mockResolvedValue({
        historyId: 'h1',
        studentId: 's1',
        student: {
          studentName: 'テスト学生',
          grade: 1,
          departmentId: 1,
          minorCategoryId: 101,
        },
        statusId: 1,
        other: '備考',
        startTime: mockDate,
        endTime: null,
        validFlag: true,
        updatedAt: mockDate,
      });

      const result = await historyService.getHistory('h1');

      expect(result).not.toBeNull();
      expect(result?.studentName).toBe('テスト学生');
      expect(result?.startTime).toBe(formatDateTime(mockDate));
      expect(result?.endTime).toBeNull();
    });

    it('履歴が存在しない場合、nullを返すこと', async () => {
      mockHistoryRepo.find.mockResolvedValue(null);
      const result = await historyService.getHistory('non-existent');
      expect(result).toBeNull();
    });
  });

  describe('createHistory', () => {
    it('履歴を作成し、整形して返すこと', async () => {
      const mockDate = new Date();
      const input = { studentIds: ['s1'], statusId: 1, startTime: mockDate };
      const mockCreated = [
        {
          historyId: 'h1',
          studentId: 's1',
          student: { studentName: '学生1', grade: 1, departmentId: 1, minorCategoryId: 101 },
          statusId: 1,
          startTime: mockDate,
          endTime: null,
          validFlag: true,
          createdAt: mockDate,
          updatedAt: mockDate,
        },
      ];
      mockHistoryRepo.createHistory.mockResolvedValue(mockCreated);

      const result = await historyService.createHistory(input as any);

      expect(result).toHaveLength(1);
      expect(result[0].historyId).toBe('h1');
      expect(mockHistoryRepo.createHistory).toHaveBeenCalledWith(input);
    });
  });

  describe('updateHistory', () => {
    it('履歴を更新し、整形して返すこと', async () => {
      const mockDate = new Date();
      const input = { statusId: 2 };
      mockHistoryRepo.updateHistory.mockResolvedValue({
        historyId: 'h1',
        studentId: 's1',
        student: { studentName: '学生1', grade: 1, departmentId: 1, minorCategoryId: 101 },
        statusId: 2,
        startTime: mockDate,
        endTime: null,
        validFlag: true,
        updatedAt: mockDate,
      });

      const result = await historyService.updateHistory(input as any, 'h1');

      expect(result.statusId).toBe('2');
      expect(mockHistoryRepo.updateHistory).toHaveBeenCalledWith(input, 'h1');
    });

    it('更新対象がない場合、OptimisticLockErrorを投げること', async () => {
      mockHistoryRepo.updateHistory.mockResolvedValue(null);
      await expect(historyService.updateHistory({} as any, 'unknown')).rejects.toThrow();
    });
  });

  describe('deleteHistory', () => {
    it('リポジトリの削除メソッドを呼び出すこと', async () => {
      await historyService.deleteHistory('h1');
      expect(mockHistoryRepo.deleteHistory).toHaveBeenCalledWith('h1');
    });
  });

  describe('searchByStartTimeHistories', () => {
    it('開始時刻に基づき履歴を検索し、集計結果を返すこと', async () => {
      const mockDate = new Date();
      const mockHistories = [
        {
          statusId: 1,
          student: {
            grade: 1,
            departmentId: 1,
            minorCategoryId: 101,
            minorCategory: {
              subCategoryId: 11,
              subCategory: { categoryId: 1 },
            },
          },
        },
      ];
      mockHistoryRepo.searchByStartTimeHistories.mockResolvedValue(mockHistories);

      const result = await historyService.searchByStartTimeHistories(mockDate);

      expect(result).toHaveProperty('deptGradeAggregation');
      expect(result).toHaveProperty('categoryAggregation');
      expect(mockHistoryRepo.searchByStartTimeHistories).toHaveBeenCalledWith(mockDate);
    });
  });
});
