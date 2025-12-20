import { DepartmentTable } from '@/features/department';

export const DepartmentIndexPage = () => {
  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center">学科一覧</h2>
      <DepartmentTable />
    </div>
  );
};
