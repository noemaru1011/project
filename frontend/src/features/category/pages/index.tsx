import { CategoryTable } from '@/features/category/components';
import { Loading } from '@/components/ui/Loading/Loading';
import { useCategoryList } from '@/features/category/hooks/useCategoryList';

export const CategoryIndexPage = () => {
  const { data, loading } = useCategoryList();

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center">大分類一覧</h2>
      <Loading loading={loading}>
        <CategoryTable data={data} />
      </Loading>
    </div>
  );
};
