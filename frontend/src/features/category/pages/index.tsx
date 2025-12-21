import { CategoryTable } from '@/features/category/components';

export const CategoryIndexPage = () => {
  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center">大分類一覧</h2>
      <CategoryTable />
    </div>
  );
};
