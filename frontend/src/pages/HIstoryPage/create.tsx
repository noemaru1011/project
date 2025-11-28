import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { CheckboxGroup } from '@/components/molecules/CheckboxGroup';
import { Accordion } from '@/components/molecules/Accordion';
import { Loading } from '@/components/atoms/Loading';
import { categoryOptions } from '@/constants/categoryOptions';
import { subCategoryOptions } from '@/constants/subCategoryOptions';
import { minorCategoryOptions } from '@/constants/minorCategoryOptions';
import { gradeOptions } from '@/constants/gradeOptions';
import { departmentOptions } from '@/constants/departmentOptions';
import { StudentSearchApi } from '@/api/studentSearchApi';
import { useSearch } from '@/hooks/useSearch';
import type { StudentQuery } from '@/interface/studentQuery';
import type { StudentForSearch } from '@/interface/student';

export const HistoryCreate = () => {
  const { handleSubmit, control, getValues } = useForm<StudentQuery>({
    defaultValues: {
      categoryId: [],
      subCategoryId: [],
      minorCategoryId: [],
      departmentId: [],
      grade: [],
    },
  });

  const {
    data: results,
    loading,
    search,
  } = useSearch<StudentForSearch, StudentQuery>(StudentSearchApi.search);

  const onSubmit = async () => {
    const query = getValues();
    try {
      await search(query);
    } catch (err: any) {
      console.error(err);
    }
  };

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
              row={4}
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
    <div className="p-4 flex flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-2xl gap-4 sm:gap-6"
      >
        <Accordion items={accordionItems} allowMultiple={true} className="w-full" />
        <Button variant="Search" type="submit" className="self-end" />
      </form>

      <Loading loading={loading}>
        <div className="mt-6 w-full overflow-x-auto">
          <table className="min-w-full border border-gray-300 divide-y divide-gray-200 text-sm sm:text-base">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">名前</th>
                <th className="px-4 py-2 text-left">学年</th>
                <th className="px-4 py-2 text-left">大分類</th>
                <th className="px-4 py-2 text-left">中分類</th>
                <th className="px-4 py-2 text-left">小分類</th>
                <th className="px-4 py-2 text-left">学科</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    データがありません
                  </td>
                </tr>
              ) : (
                results.map((s) => (
                  <tr key={s.studentId}>
                    <td className="px-4 py-2">{s.studentName}</td>
                    <td className="px-4 py-2">{s.grade}</td>
                    <td className="px-4 py-2">
                      {s.minorCategory.subCategory.category.categoryName}
                    </td>
                    <td className="px-4 py-2">{s.minorCategory.subCategory.subCategoryName}</td>
                    <td className="px-4 py-2">{s.minorCategory.minorCategoryName}</td>
                    <td className="px-4 py-2">{s.department.departmentName}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Loading>
    </div>
  );
};
