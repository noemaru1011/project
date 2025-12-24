import type { Control } from 'react-hook-form';
import type { StudentQuery } from '@/features/search/student/types';
import { Accordion } from '@/components/ui/Accordion/Accordion';
import { CategorySearchAccordionItem } from '@/features/category/components';
import { SubCategorySearchAccordionItem } from '@/features/subCategory/components';
import { MinorCategorySearchAccordionItem } from '@/features/minorCategory/components';
import { GradeSearchAccordionItem } from '@/features/grade/components';
import { DepartmentSearchAccordionItem } from '@/features/department/components';

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
            <CategorySearchAccordionItem<StudentQuery>
              control={control}
              name="categoryId"
              column={4}
            />
          ),
        },
        {
          id: 'subCategory',
          title: '中分類',
          children: (
            <SubCategorySearchAccordionItem<StudentQuery>
              control={control}
              name="subCategoryId"
              column={4}
            />
          ),
        },
        {
          id: 'minorCategory',
          title: '小分類',
          children: (
            <MinorCategorySearchAccordionItem<StudentQuery>
              control={control}
              name="minorCategoryId"
              column={16}
            />
          ),
        },
        {
          id: 'grade',
          title: '学年',
          children: (
            <GradeSearchAccordionItem<StudentQuery> control={control} name="grade" column={4} />
          ),
        },
        {
          id: 'department',
          title: '学科',
          children: (
            <DepartmentSearchAccordionItem<StudentQuery>
              control={control}
              name="departmentId"
              column={7}
            />
          ),
        },
      ]}
    />
  );
};
