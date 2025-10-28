import { CategoryHooks } from "@/hooks/CategoryHooks";
import { CategoryLabels } from "@shared/schemas/Category";

const CategoryIndex = () => {
  const { categories, loading, error } = CategoryHooks();

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  if (error) return <p className="text-red-500">エラーが発生しました。</p>;

  return (
    <div className="flex justify-center mt-4">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-md">
        <table className="table-auto min-w-[200px]">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              {Object.values(CategoryLabels).map((label) => (
                <th key={label} className="p-2 text-center">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.categoryId}
                className="border-b border-gray-300 last:border-0"
              >
                <td className="p-2 text-center">{cat.categoryName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryIndex;
