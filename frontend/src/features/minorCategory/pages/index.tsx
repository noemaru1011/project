import { Loading } from '@/components/ui/Loading/Loading';
import { MinorCategoryTable } from '@/features/minorCategory/components';
import { useMinorCategoryList } from '@/features/minorCategory/hooks/useMinorCategoryList';

export const MinorCategoryIndexPage = () => {
  const { data, loading } = useMinorCategoryList();

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center">小分類一覧</h2>
      <Loading loading={loading}>
        <MinorCategoryTable data={data} />
      </Loading>
    </div>
  );
};
