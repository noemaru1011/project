import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { CheckboxGroup } from '@/components/molecules/CheckboxGroup';
import { Loading } from '@/components/atoms/Loading';
import { categoryOptions } from '@/constants/category';
import { subCategoryOptions } from '@/constants/subCategory';
import { minorCategoryOptions } from '@/constants/minorCategory';
import { departmentOptions } from '@/constants/department';
import { gradeOptions } from '@/constants/grade';
import { StudentApi } from '@/api/studentApi';
import { useCrud } from '@/hooks/useCrud';
import type { QueryStudent } from '@/types/queryStudent';
import type { DisplayStudent } from '@/types/displayStudent';

export const HistoryCreate = () => {
  const { handleSubmit, control, getValues } = useForm<QueryStudent>({
    defaultValues: {
      categories: [],
      subCategories: [],
      minorCategories: [],
      departments: [],
      grades: [],
    },
  });

  const { data: results, fetchData, loading } = useCrud<DisplayStudent, any>(StudentApi);
  const [checkedRows, setCheckedRows] = useState<Record<number, boolean>>({});

  const toggleCheck = (id: number) => {
    setCheckedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const onSubmit = async () => {
    const query = getValues();

    // string[] を number[] に変換
    const numericQuery = {
      categories: query.categories.map(Number),
      subCategories: query.subCategories.map(Number),
      minorCategories: query.minorCategories.map(Number),
      departmentIds: query.departments.map(Number),
      grades: query.grades.map(Number),
    };

    try {
      console.log('Submitting query:', numericQuery);
      await fetchData(numericQuery);
      setCheckedRows({});
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
          name="categories"
          control={control}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              options={categoryOptions}
              label="大分類"
              error={fieldState.error?.message}
            />
          )}
        />

        {/* 中分類 */}
        <Controller
          name="subCategories"
          control={control}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              options={subCategoryOptions}
              label="中分類"
              error={fieldState.error?.message}
            />
          )}
        />

        {/* 小分類 */}
        <Controller
          name="minorCategories"
          control={control}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              options={minorCategoryOptions}
              label="小分類"
              error={fieldState.error?.message}
            />
          )}
        />

        {/* 学年 */}
        <Controller
          name="grades"
          control={control}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              options={gradeOptions}
              label="学年"
              error={fieldState.error?.message}
            />
          )}
        />

        {/* 学科 */}
        <Controller
          name="departments"
          control={control}
          render={({ field, fieldState }) => (
            <CheckboxGroup
              name={field.name}
              value={field.value}
              onChange={field.onChange}
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
                <th className="px-4 py-2 text-center">選択</th>
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
                  const checked = checkedRows[s.studentId] || false;
                  return (
                    <tr key={s.studentId} className={checked ? 'bg-blue-100' : ''}>
                      <td className="px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCheck(s.studentId)}
                        />
                      </td>
                      <td className="px-4 py-2">{s.studentName}</td>
                      <td className="px-4 py-2">{s.grade}</td>
                      <td className="px-4 py-2">
                        {s.minorCategory?.subCategory?.category?.categoryName ?? '—'}
                      </td>
                      <td className="px-4 py-2">
                        {s.minorCategory?.subCategory?.subCategoryName ?? '—'}
                      </td>
                      <td className="px-4 py-2">{s.minorCategory?.minorCategoryName ?? '—'}</td>
                      <td className="px-4 py-2">{s.department?.departmentName ?? '—'}</td>
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
