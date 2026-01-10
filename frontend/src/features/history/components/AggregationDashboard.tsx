import { useMemo } from 'react';
import { useCategoryList } from '@/features/category/hooks/useCategoryList';
import { useSubCategoryList } from '@/features/subCategory/hooks/useSubCategoryList';
import { useMinorCategoryList } from '@/features/minorCategory/hooks/useMinorCategoryList';
import { useStatusList } from '@/features/status/hooks/useStatusList';
import type { Category } from '@/features/category/types';
import type { SubCategory } from '@/features/subCategory/types';
import type { MinorCategory } from '@/features/minorCategory/types';
import type { AggregationData } from '../types';
import { HierarchyCountTable, type OrgNode } from './HierarchyCountTable';

type Props = {
  data: AggregationData;
};

export const AggregationDashboard = ({ data }: Props) => {
  const { data: categories } = useCategoryList();
  const { data: subCategories } = useSubCategoryList();
  const { data: minorCategories } = useMinorCategoryList();
  const { data: statuses } = useStatusList();

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

  if (!orgNodes.length) return null;

  return (
    <div className="space-y-8 mt-8">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 px-4">組織別集計</h3>
        <div className="px-4">
          <HierarchyCountTable data={orgNodes} statuses={statuses} />
        </div>
      </div>
    </div>
  );
};
