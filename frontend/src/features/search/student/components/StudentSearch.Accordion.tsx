import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { Group, Library, School } from 'lucide-react';
import { Accordion } from '@/components/ui/Accordion/Accordion';
import { CategoryCheckboxGroup } from '@/features/category/components';
import { SubCategoryCheckboxGroup } from '@/features/subCategory/components';
import { MinorCategoryCheckboxGroup } from '@/features/minorCategory/components';
import { GradeCheckboxGroup } from '@/features/grade/components';
import { DepartmentCheckboxGroup } from '@/features/department/components';
import type { StudentSearchInput } from '@shared/models/student';

type Props = {
  control: Control<StudentSearchInput>;
};

export const StudentSearchAccordion = ({ control }: Props) => {
  return (
    <Accordion
      allowMultiple
      items={[
        {
          id: 'category',
          title: '大分類',
          badge: 4,
          icon: <Group className="size-4" />,
          children: (
            <Controller
              name="categoryIds"
              control={control}
              render={({ field }) => (
                <CategoryCheckboxGroup
                  name={field.name}
                  value={(field.value ?? []) as string[]}
                  onChange={field.onChange}
                />
              )}
            />
          ),
        },
        {
          id: 'subCategory',
          title: '中分類',
          badge: 16,
          icon: <Group className="size-4" />,
          children: (
            <Controller
              name="subCategoryIds"
              control={control}
              render={({ field }) => (
                <SubCategoryCheckboxGroup
                  name={field.name}
                  value={(field.value ?? []) as string[]}
                  onChange={field.onChange}
                />
              )}
            />
          ),
        },
        {
          id: 'minorCategory',
          title: '小分類',
          badge: 48,
          icon: <Group className="size-4" />,
          children: (
            <Controller
              name="minorCategoryIds"
              control={control}
              render={({ field }) => (
                <MinorCategoryCheckboxGroup
                  name={field.name}
                  value={(field.value ?? []) as string[]}
                  onChange={field.onChange}
                />
              )}
            />
          ),
        },
        {
          id: 'grade',
          title: '学年',
          badge: 4,
          icon: <School className="size-4" />,
          children: (
            <Controller
              name="grades"
              control={control}
              render={({ field }) => (
                <GradeCheckboxGroup
                  name={field.name}
                  value={(field.value ?? []) as string[]}
                  onChange={field.onChange}
                />
              )}
            />
          ),
        },
        {
          id: 'department',
          title: '学科',
          badge: 7,
          icon: <Library className="size-4" />,
          children: (
            <Controller
              name="departmentIds"
              control={control}
              render={({ field }) => (
                <DepartmentCheckboxGroup
                  name={field.name}
                  value={(field.value ?? []) as string[]}
                  onChange={field.onChange}
                />
              )}
            />
          ),
        },
      ]}
    />
  );
};
