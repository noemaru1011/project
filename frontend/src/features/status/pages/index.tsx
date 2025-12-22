import { Loading } from '@/components/ui/Loading/Loading';
import { StatusTable } from '@/features/status/components';
import { useStatusList } from '@/features/status/hooks/useStatusList';

export const StatusIndexPage = () => {
  const { data, loading } = useStatusList();

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center">状況一覧</h2>
      <Loading loading={loading}>
        <StatusTable data={data} />
      </Loading>
    </div>
  );
};
