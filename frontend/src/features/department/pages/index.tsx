import { DepartmentTable } from '@/features/department/components';
import { Loading } from '@/components/ui/Loading/Loading';
import { useDepartmentList } from '@/features/department/hooks/useDepartmentList';

export const DepartmentIndexPage = () => {
  const { data, loading } = useDepartmentList();

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center">学科一覧</h2>
      <Loading loading={loading}>
        <DepartmentTable data={data} />
      </Loading>
    </div>
  );
};
