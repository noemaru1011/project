import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { Accordion } from '@/components/ui/Accordion/Accordion';
import { CategoryCheckboxGroup } from '@/features/category/components';
import { SubCategoryCheckboxGroup } from '@/features/subCategory/components';
import { MinorCategoryCheckboxGroup } from '@/features/minorCategory/components';
import { GradeCheckboxGroup } from '@/features/grade/components';
import { DepartmentCheckboxGroup } from '@/features/department/components';
import type { StudentQuery } from '@/features/search/student';

type Props = {
  control: Control<StudentQuery>;
};

export const StudentSearchAccordion = ({ control }: Props) => {
  return (
    <Accordion
      allowMultiple
      items={[
        {
          id: 'category',
          title: '大分類',
          children: (
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => <CategoryCheckboxGroup {...field} />}
            />
          ),
        },
        {
          id: 'subCategory',
          title: '中分類',
          children: (
            <Controller
              name="subCategoryId"
              control={control}
              render={({ field }) => <SubCategoryCheckboxGroup {...field} />}
            />
          ),
        },
        {
          id: 'minorCategory',
          title: '小分類',
          children: (
            <Controller
              name="minorCategoryId"
              control={control}
              render={({ field }) => <MinorCategoryCheckboxGroup {...field} />}
            />
          ),
        },
        {
          id: 'grade',
          title: '学年',
          children: (
            <Controller
              name="grade"
              control={control}
              render={({ field }) => <GradeCheckboxGroup {...field} />}
            />
          ),
        },
        {
          id: 'department',
          title: '学科',
          children: (
            <Controller
              name="departmentId"
              control={control}
              render={({ field }) => <DepartmentCheckboxGroup {...field} />}
            />
          ),
        },
      ]}
    />
  );
};
