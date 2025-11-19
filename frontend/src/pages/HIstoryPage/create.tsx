// src/pages/HistoryPage/create.tsx
import { useForm } from 'react-hook-form';
import { Button } from '@/components/elements/Button';
import { CheckGroup } from '@/components/elements/CheckGroup';
import { RadioGroup } from '@/components/elements/RadioGroup';
import { Loading } from '@/components/elements/Loading';
import { useCrud } from '@/hooks/useCrud';
import { categoryOptions } from '@/constants/category';
import { subCategoryOptions } from '@/constants/subCategory';
import { minorCategoryOptions } from '@/constants/minorCategory';
import { departmentOptions } from '@/constants/department';
import { gradeOptions } from '@/constants/grade';
import { statusOptions } from '@/constants/status';
import { StudentApi } from '@/api/studentApi';
import type { StudentQuery } from '@shared/schemas/student';

// 表示用の Student 型（API の実データに合わせて調整してください）
type DisplayStudent = {
  studentId: number;
  studentName: string;
  grade: number;
  email?: string;

  // id フィールド（DB 側）も持つが、ネストした詳細フィールドを表示する
  minorCategoryId?: number;
  departmentId?: number;

  department?: {
    departmentName?: string;
  };

  minorCategory?: {
    minorCategoryName?: string;
    subCategory?: {
      subCategoryName?: string;
      category?: {
        categoryName?: string;
      };
    };
  };
};

type FormValues = {
  categories: string[];
  subCategories: string[];
  minorCategories: string[];
  grade: string[];
  departments: string[];
  status: string[]; // ラジオで1つだけ選ぶ場合でも配列にしている既存仕様に合わせる
};

export const HistoryCreate = () => {
  // useCrud は <T = DisplayStudent, Q = StudentQuery> を受け取る前提
  const { data: results, fetchData, loading } = useCrud<Student, StudentQuery>(StudentApi);

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

  const onSubmit = async (form: FormValues) => {
    // 型変換：string[] -> number[]（API 側が数値 ID を期待する想定）
    const query: StudentQuery = {
      categories: form.categories.length ? form.categories.map(Number) : undefined,
      subCategories: form.subCategories.length ? form.subCategories.map(Number) : undefined,
      minorCategories: form.minorCategories.length ? form.minorCategories.map(Number) : undefined,
      departmentIds: form.departments.length ? form.departments.map(Number) : undefined,
      grades: form.grade.length ? form.grade.map(Number) : undefined,
      // status は optional なので include しないか型に合わせて追加する
    };

    try {
      // 検索を実行（useCrud の searchData が data を更新する）
      await fetchData(query);
      // results は自動で更新されるのでここで setState は不要
    } catch (err: any) {
      // useCrud 側で共通ハンドリングしている想定なので基本不要だがログは残す
      console.error('search error', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3 flex-wrap">
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

        <div className="mt-4">
          <Button variant="Search" type="submit" />
        </div>
      </form>

      <Loading loading={loading}>
        <div className="mt-6">
          <h2 className="font-bold mb-2">検索結果</h2>

          {!results || results.length === 0 ? (
            <p className="text-gray-500">データがありません</p>
          ) : (
            <div className="space-y-2">
              {results.map((s) => (
                <div key={s.studentId} className="p-3 border rounded-lg shadow-sm bg-white">
                  <p>名前：{s.studentName}</p>
                  <p>学年：{s.grade}</p>
                  <p>
                    大分類：
                    {s.minorCategory?.subCategory?.category?.categoryName ?? '—'}
                  </p>
                  <p>中分類：{s.minorCategory?.subCategory?.subCategoryName ?? '—'}</p>
                  <p>小分類：{s.minorCategory?.minorCategoryName ?? '—'}</p>
                  <p>学科：{s.department?.departmentName ?? '—'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Loading>
    </div>
  );
};

export default HistoryCreate;
