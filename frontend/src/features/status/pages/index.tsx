import { StatusTable } from '@/features/status/components';

export const StatusIndexPage = () => {
  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center">状況一覧</h2>
      <StatusTable />
    </div>
  );
};
