import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { CheckboxGroup } from '@/components/molecules/CheckboxGroup';
import { Loading } from '@/components/atoms/Loading';
import { categoryOptions } from '@/constants/category';
import { subCategoryOptions } from '@/constants/subCategory';
import { minorCategoryOptions } from '@/constants/minorCategory';
import { departmentOptions } from '@/constants/department';
import { gradeOptions } from '@/constants/grade';
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
      console.log('Submitting query:', query);
      await search(query);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      {/* 検索フォーム */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-3 space-y-4">
        {/* 大分類 */}
        <Controller
          name="categoryId"
          control={control}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              options={categoryOptions}
              label="大分類"
              error={fieldState.error?.message}
            />
          )}
        />

        {/* 中分類 */}
        <Controller
          name="subCategoryId"
          control={control}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              options={subCategoryOptions}
              label="中分類"
              error={fieldState.error?.message}
            />
          )}
        />

        {/* 小分類 */}
        <Controller
          name="minorCategoryId"
          control={control}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              options={minorCategoryOptions}
              label="小分類"
              error={fieldState.error?.message}
            />
          )}
        />

        {/* 学年 */}
        <Controller
          name="grade"
          control={control}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              options={gradeOptions}
              label="学年"
              error={fieldState.error?.message}
            />
          )}
        />

        {/* 学科 */}
        <Controller
          name="departmentId"
          control={control}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              name={field.name}
              value={field.value.map(String)}
              onChange={(vals) => field.onChange(vals.map(Number))}
              options={departmentOptions}
              label="学科"
              error={fieldState.error?.message}
            />
          )}
        />

        <Button variant="Search" type="submit" />
      </form>

      {/* 結果一覧 */}
      <Loading loading={loading}>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
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
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    データがありません
                  </td>
                </tr>
              ) : (
                results.map((s) => {
                  return (
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Loading>
    </div>
  );
};
