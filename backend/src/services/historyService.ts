import { HistoryRepository } from '@/repositories/historyRepository';
import { MinorCategoryRepository } from '@/repositories/minorCategoryRepository';
import { formatDateTime } from '@/utils/formatDateTime';
import { ConflictError } from '@/errors/appError';

export const HistoryService = {
  async getHistory(historyId: string) {
    const history = await HistoryRepository.find(historyId);
    if (!history) return null;
    //DTO
    return {
      historyId: history.historyId,
      studentName: history.student.studentName,
      grade: history.student.grade,
      departmentId: history.student.departmentId,
      minorCategoryId: history.student.minorCategoryId,
      statusId: history.statusId,
      other: history.other,
      validFlag: history.validFlag,
      startTime: formatDateTime(history.startTime),
      endTime: formatDateTime(history.endTime),
      updatedAt: history.updatedAt,
    };
  },

  async searchHistories(data: {
    minorCategoryIds?: number[];
    subCategoryIds?: number[];
    categoryIds?: number[];
    grades?: number[];
    departmentIds?: number[];
  }) {
    const minorCategoryIds = await MinorCategoryRepository.resolveMinorCategoryIds(data);

    const histories = await HistoryRepository.searchHistories({
      minorCategoryIds,
      departmentIds: data.departmentIds,
      grades: data.grades,
    });

    return histories.map((h) => ({
      historyId: h.historyId,
      studentName: h.student.studentName,
      grade: h.student.grade,
      departmentName: h.student.department.departmentName,
      minorCategoryName: h.student.minorCategory.minorCategoryName,
      statusName: h.status.statusName,
      other: h.other,
      startTime: formatDateTime(h.startTime),
      endTime: formatDateTime(h.endTime),
    }));
  },

  async searchByStartTimeHistories(query: Date) {
    console.log(query);
    const histories = await HistoryRepository.searchByStartTimeHistories(query);
    const historiesMapped = histories.map((h) => ({
      statusId: h.statusId,
      grade: h.student.grade,
      departmentId: h.student.departmentId,
      minorCategoryId: h.student.minorCategoryId,
      subCategoryId: h.student.minorCategory.subCategoryId,
      categoryId: h.student.minorCategory.subCategory.categoryId,
    }));
    const deptGradeAggregation = aggregateByDepartmentAndGrade(historiesMapped);
    const categoryAggregation = aggregateByCategoryHierarchy(historiesMapped);
    return { deptGradeAggregation, categoryAggregation };
  },
  async createHistory(data: {
    studentIds: string[];
    statusId: number;
    other: string;
    startTime: Date;
    endTime?: Date | null;
  }) {
    await HistoryRepository.createHistory(data);
  },

  async updateHistory(
    data: {
      statusId: number;
      other: string;
      startTime: Date;
      endTime?: Date | null;
      validFlag: boolean;
      updatedAt: Date;
    },
    historyId: string,
  ) {
    const history = await HistoryRepository.updateHistory(data, historyId);
    if (history.count === 0) throw new ConflictError();
  },

  async deleteHistory(historyId: string) {
    await HistoryRepository.deleteHistory(historyId);
  },
};

interface History {
  statusId: number;
  grade: number;
  departmentId: number;
  minorCategoryId: number;
  subCategoryId: number;
  categoryId: number;
}

function aggregateByDepartmentAndGrade(histories: History[]) {
  const result: Record<number, Record<number, Record<number, number>>> = {};

  histories.forEach((h) => {
    const { departmentId, grade, statusId } = h;

    if (!result[departmentId]) result[departmentId] = {};
    if (!result[departmentId][grade]) result[departmentId][grade] = {};

    result[departmentId][grade][statusId] = (result[departmentId][grade][statusId] || 0) + 1;
  });

  return result;
}

function aggregateByCategoryHierarchy(histories: History[]) {
  const result: Record<
    number, // categoryId (大分類)
    {
      status?: Record<number, number>;
      subCategories?: Record<
        number, // subCategoryId (中分類)
        {
          status?: Record<number, number>;
          minorCategories?: Record<
            number, // minorCategoryId (小分類)
            Record<number, number> // statusId -> count
          >;
        }
      >;
    }
  > = {};

  histories.forEach((h) => {
    const { categoryId, subCategoryId, minorCategoryId, statusId } = h;

    if (!result[categoryId]) result[categoryId] = { status: {}, subCategories: {} };

    // 大分類ごとの Status 集計
    result[categoryId].status![statusId] = (result[categoryId].status![statusId] || 0) + 1;

    // 中分類
    const sub = result[categoryId].subCategories!;
    if (!sub[subCategoryId]) sub[subCategoryId] = { status: {}, minorCategories: {} };

    sub[subCategoryId].status![statusId] = (sub[subCategoryId].status![statusId] || 0) + 1;

    // 小分類
    const minor = sub[subCategoryId].minorCategories!;
    if (!minor[minorCategoryId]) minor[minorCategoryId] = {};

    minor[minorCategoryId][statusId] = (minor[minorCategoryId][statusId] || 0) + 1;
  });

  return result;
}
