import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { useFetchAll } from '@/hooks/useFetchAll';
import { StatusLabels } from '@/constants/statusLabels';
import { StatusAPi } from '@/api/statusApi';
import type { Status } from '@/interface/status';
import { handleApiError } from '@/utils/handleApiError';

export const StatusIndex = () => {
  const navigate = useNavigate();
  const { data: Status, fetchAll, loading } = useFetchAll<Status>(StatusAPi.index);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAll();
      } catch (err: any) {
        handleApiError(err, navigate);
      }
    };
    fetchData();
  }, []);

  return (
    <Loading loading={loading}>
      <div className="max-w-lg mx-auto p-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center">状況一覧</h2>
        <Table labels={StatusLabels} data={Status} keyField="statusId" />
      </div>
    </Loading>
  );
};
