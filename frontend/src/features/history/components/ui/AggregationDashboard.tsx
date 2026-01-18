import { useMemo } from 'react';
import { useCategoryList } from '@/features/category/hooks/useCategoryList';
import { useSubCategoryList } from '@/features/subCategory/hooks/useSubCategoryList';
import { useMinorCategoryList } from '@/features/minorCategory/hooks/useMinorCategoryList';
import { useStatusList } from '@/features/status/hooks/useStatusList';
import { useDepartmentList } from '@/features/department/hooks/useDepartmentList';
import { gradeOptions } from '@/features/grade/constants/gradeOptions';
import type { Category, SubCategory, MinorCategory, Department } from '@shared/models/master';
import type { AggregationData } from '@shared/models/history';
import { HierarchyCountTable, type OrgNode } from './HierarchyCountTable';

type Props = {
  data: AggregationData;
};

export const AggregationDashboard = ({ data }: Props) => {
  const { data: categories } = useCategoryList();
  const { data: subCategories } = useSubCategoryList();
  const { data: minorCategories } = useMinorCategoryList();
  const { data: statuses } = useStatusList();
  const { data: departments } = useDepartmentList();

  // 組織別集計データの作成
  const orgNodes = useMemo((): OrgNode[] => {
    if (
      !categories.length ||
      !subCategories.length ||
      !minorCategories.length ||
      !statuses.length
    ) {
      return [];
    }

    const { categoryAggregation } = data;

    return Object.entries(categoryAggregation).map(([catId, catData]): OrgNode => {
      const category = categories.find((c: Category) => String(c.categoryId) === catId);

      const subNodes = catData.subCategories
        ? Object.entries(catData.subCategories).map(([subId, subData]): OrgNode => {
            const subCategory = subCategories.find(
              (s: SubCategory) => String(s.subCategoryId) === subId,
            );

            const minorNodes = subData.minorCategories
              ? Object.entries(subData.minorCategories).map(([minId, counts]): OrgNode => {
                  const minorCategory = minorCategories.find(
                    (m: MinorCategory) => String(m.minorCategoryId) === minId,
                  );
                  return {
                    id: minId,
                    name: minorCategory?.minorCategoryName ?? minId,
                    counts: counts as Record<string, number>,
                  };
                })
              : [];

            return {
              id: subId,
              name: subCategory?.subCategoryName ?? subId,
              counts: (subData.status ?? {}) as Record<string, number>,
              children: minorNodes,
            };
          })
        : [];

      return {
        id: catId,
        name: category?.categoryName ?? catId,
        counts: (catData.status ?? {}) as Record<string, number>,
        children: subNodes,
      };
    });
  }, [data, categories, subCategories, minorCategories, statuses]);

  // 学科・学年別集計データの作成
  const deptGradeNodes = useMemo((): OrgNode[] => {
    if (!departments.length || !statuses.length) {
      return [];
    }

    const { deptGradeAggregation } = data;

    return Object.entries(deptGradeAggregation).map(([deptId, gradeData]): OrgNode => {
      const dept = departments.find((d: Department) => String(d.departmentId) === deptId);

      const gradeNodes = Object.entries(gradeData).map(([grade, counts]): OrgNode => {
        const gradeLabel = gradeOptions.find((g) => g.value === grade)?.label ?? `${grade}学年`;
        return {
          id: `${deptId}-${grade}`,
          name: gradeLabel,
          counts: counts as Record<string, number>,
        };
      });

      // 学部ごとの合計を計算
      const deptTotalCounts: Record<string, number> = {};
      Object.values(gradeData).forEach((gradeCounts) => {
        Object.entries(gradeCounts).forEach(([statusId, count]) => {
          deptTotalCounts[statusId] = (deptTotalCounts[statusId] || 0) + (count as number);
        });
      });

      return {
        id: deptId,
        name: dept?.departmentName ?? deptId,
        counts: deptTotalCounts,
        children: gradeNodes,
      };
    });
  }, [data, departments, statuses]);

  return (
    <div className="space-y-12 mt-8">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 px-4 border-l-4 border-indigo-600">
          組織別集計
        </h3>
        <div className="px-4">
          <HierarchyCountTable data={orgNodes} statuses={statuses} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 px-4 border-l-4 border-indigo-600">
          学科・学年別集計
        </h3>
        <div className="px-4">
          <HierarchyCountTable data={deptGradeNodes} statuses={statuses} />
        </div>
      </div>
    </div>
  );
};
