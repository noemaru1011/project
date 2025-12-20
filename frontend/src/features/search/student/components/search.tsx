import { Controller } from 'react-hook-form';
import type { StudentQuery } from '@/features/search/student/types';
import { Accordion } from '@/components/molecules/Accordion';
import { CheckboxGroup } from '@/components/molecules/CheckboxGroup';
import { Button } from '@/components/atoms/Button';
import { categoryOptions } from '@/features/category/constants/';
import { subCategoryOptions } from '@/features/subCategory/constants/options';
import { minorCategoryOptions } from '@/features/minorCategory/constants/options';
import { gradeOptions } from '@/constants/gradeOptions';
import { departmentOptions } from '@/features/department/constants/options';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useStudentSearch } from '../hooks/useStudentSearch';

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
            <CheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              options={categoryOptions}
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
            <CheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              options={subCategoryOptions}
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
            <CheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              options={minorCategoryOptions}
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
            <CheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              options={gradeOptions}
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
            <CheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              options={departmentOptions}
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
