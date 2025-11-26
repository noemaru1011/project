import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Loading } from '@/components/atoms/Loading';
import { useFetchAll } from '@/hooks/useFetchAll';
import { useSearch } from '@/hooks/useSearch';
import { StudentApi } from '@/api/studentApi';
import { StudentSearchApi } from '@/api/studentSearchApi';
import type { Student } from '@/interface/student';
import type { StudentQuery } from '@/interface/studentQuery';
import { validation } from '@shared/schemas/student';

export const StudentSearchPage = () => {
  // -----------------------------
  // 初期一覧取得
  // -----------------------------
  const {
    data: studentsAll,
    fetchAll,
    loading: loadingAll,
  } = useFetchAll<Student>(StudentApi.index);

  // -----------------------------
  // 検索用フック
  // -----------------------------
  const {
    data: studentsSearch,
    search,
    loading: loadingSearch,
  } = useSearch<Student, StudentQuery>(StudentSearchApi.search);

  const [students, setStudents] = useState<Student[]>([]);

  // 初期一覧セット
  useEffect(() => {
    fetchAll();
  }, []);

  // fetchAll または search の結果を画面に反映
  useEffect(() => {
    setStudents(studentsSearch.length > 0 ? studentsSearch : studentsAll);
  }, [studentsAll, studentsSearch]);

  // -----------------------------
  // フィルタフォーム
  // -----------------------------
  const { register, handleSubmit } = useForm<StudentQuery>({
    resolver: zodResolver(validation),
  });

  const onSearch = (data: StudentQuery) => {
    search(data);
  };

  return (
    <Loading loading={loadingAll || loadingSearch}>
      <div className="p-4">
        <form onSubmit={handleSubmit(onSearch)} className="flex gap-2 mb-4">
          <Input
            id="minorCategoryId"
            type="text"
            placeholder="小分類ID"
            {...register('minorCategoryId')}
          />
          <Input
            id="subCategoryId"
            type="text"
            placeholder="サブ分類ID"
            {...register('subCategoryId')}
          />
          <Input id="categoryId" type="text" placeholder="カテゴリID" {...register('categoryId')} />
          <Input id="grade" type="text" placeholder="学年" {...register('grade')} />
          <Input id="departmentId" type="text" placeholder="学科ID" {...register('departmentId')} />
          <Button type="submit">検索</Button>
        </form>

        <table className="w-full border">
          <thead>
            <tr>
              <th>ID</th>
              <th>名前</th>
              <th>学年</th>
              <th>小分類ID</th>
              <th>サブ分類ID</th>
              <th>カテゴリID</th>
              <th>学科ID</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.studentId} className="border-t">
                <td>{s.studentId}</td>
                <td>{s.studentName}</td>
                <td>{s.grade}</td>
                <td>{s.minorCategoryId}</td>
                <td>{s.subCategoryId}</td>
                <td>{s.categoryId}</td>
                <td>{s.departmentId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Loading>
  );
};
