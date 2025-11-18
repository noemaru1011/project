import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@/components/elements/Button';
import { CheckGroup } from '@/components/elements/CheckGroup';
import { RadioGroup } from '@/components/elements/RadioGroup';
import { categoryOptions } from '@/constants/category';
import { subCategoryOptions } from '@/constants/subCategory';
import { minorCategoryOptions } from '@/constants/minorCategory';
import { departmentOptions } from '@/constants/department';
import { gradeOptions } from '@/constants/grade';
import { statusOptions } from '@/constants/status';
import { StudentApi } from '@/api/studentApi';

type FormValues = {
  categories: string[];
  subCategories: string[];
  minorCategories: string[];
  grade: string[];
  departments: string[];
  status: string[];
};

export const HistoryCreate = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      categories: [],
      subCategories: [],
      minorCategories: [],
      grade: [],
      departments: [],
      status: [],
    },
  });

  // 🔥 検索結果の state 追加！
  const [results, setResults] = useState<any[]>([]);

  const onSubmit = async (data: FormValues) => {
    try {
      const query = {
        categories: data.categories.map(Number),
        subCategories: data.subCategories.map(Number),
        minorCategories: data.minorCategories.map(Number),
        departmentIds: data.departments.map(Number),
        grades: data.grade.map(Number),
      };

      const response = await StudentApi.search(query);
      setResults(response); // ← 保存！
    } catch (err: any) {}
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3">
          <fieldset className="border border-gray-300 rounded-xl p-4 space-y-2">
            <legend className="px-2 text-sm font-medium">大分類</legend>
            <CheckGroup name="categories" options={categoryOptions} control={control} />
          </fieldset>

          <fieldset className="border border-gray-300 rounded-xl p-4 space-y-2">
            <legend className="px-2 text-sm font-medium">中分類</legend>
            <CheckGroup
              name="subCategories"
              options={subCategoryOptions}
              control={control}
              columns={4}
            />
          </fieldset>

          <fieldset className="border border-gray-300 rounded-xl p-4 space-y-2">
            <legend className="px-2 text-sm font-medium">小分類</legend>
            <CheckGroup
              name="minorCategories"
              options={minorCategoryOptions}
              control={control}
              columns={4}
            />
          </fieldset>

          <fieldset className="border border-gray-300 rounded-xl p-4 space-y-2">
            <legend className="px-2 text-sm font-medium">学年</legend>
            <CheckGroup name="grade" options={gradeOptions} control={control} />
          </fieldset>

          <fieldset className="border border-gray-300 rounded-xl p-4 space-y-2">
            <legend className="px-2 text-sm font-medium">学科</legend>
            <CheckGroup name="departments" options={departmentOptions} control={control} />
          </fieldset>

          <fieldset className="border border-gray-300 rounded-xl p-4 space-y-2">
            <legend className="px-2 text-sm font-medium">状態選択</legend>
            <RadioGroup name="status" options={statusOptions} control={control} />
          </fieldset>
        </div>

        <Button variant="Search" type="submit" />
      </form>

      {/* 🔥 ここでページに結果を描画 */}
      <div className="mt-6">
        <h2 className="font-bold mb-2">検索結果</h2>

        {results.length === 0 ? (
          <p className="text-gray-500">データがありません</p>
        ) : (
          <div className="space-y-2">
            {results.map((s) => (
              <div key={s.studentId} className="p-3 border rounded-lg shadow-sm bg-white">
                <p>名前：{s.studentName}</p>
                <p>学年：{s.grade}</p>
                <p>大分類：{s.minorCategory?.subCategory?.category?.categoryName}</p>
                <p>中分類：{s.minorCategory?.subCategory?.subCategoryName}</p>
                <p>小分類：{s.minorCategory?.minorCategoryName}</p>
                <p>学科：{s.department?.departmentName}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
