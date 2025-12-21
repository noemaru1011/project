import { Controller } from 'react-hook-form';
import type { StudentQuery } from '@/features/search/student/types';
import { Accordion } from '@/components/ui/Accordion/Accordion';
import { Button } from '@/components/ui/Button/Button';
import { CategoryCheckboxGroup } from '@/features/category/components';
import { SubCategoryCheckboxGroup } from '@/features/subCategory/components';
import { MinorCategoryCheckboxGroup } from '@/features/minorCategory/components';
import { GradeCheckboxGroup } from '@/features/grade/components';
import { DepartmentCheckboxGroup } from '@/features/department/components';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useStudentSearch } from '@/features/search/student/hooks/useStudentSearch';

type Props = {
  onSearch: (query: StudentQuery) => void | Promise<void>;
};

export const StudentSearchPanel = ({ onSearch }: Props) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { control, handleSubmit, handleSearch } = useStudentSearch(onSearch);

  const accordionItems = [
    {
      id: 'category',
      title: '大分類',
      children: (
        <Controller
          name="categoryId"
          control={control}
          render={({ field, fieldState }) => (
            <CategoryCheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              error={fieldState.error?.message}
              row={1}
            />
          )}
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
          render={({ field, fieldState }) => (
            <SubCategoryCheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              error={fieldState.error?.message}
              row={4}
            />
          )}
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
          render={({ field, fieldState }) => (
            <MinorCategoryCheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              error={fieldState.error?.message}
              row={4}
            />
          )}
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
          render={({ field, fieldState }) => (
            <GradeCheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              error={fieldState.error?.message}
            />
          )}
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
          render={({ field, fieldState }) => (
            <DepartmentCheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              error={fieldState.error?.message}
            />
          )}
        />
      ),
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit(handleSearch)} className="flex flex-col gap-4">
        <Accordion items={accordionItems} allowMultiple className="w-full" />
        <div className="flex justify-center gap-4 mt-4">
          {pathname === ROUTES.STUDENT.INDEX && (
            <Button
              type="button"
              variant="Create"
              className="w-64 mx-auto py-2"
              onClick={() => navigate(ROUTES.STUDENT.CREATE)}
            />
          )}
          <Button type="submit" variant="Search" className="w-64 mx-auto py-2" />
        </div>
      </form>
    </div>
  );
};
