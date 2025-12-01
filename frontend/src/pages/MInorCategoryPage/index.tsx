import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { useFetchAll } from '@/hooks/useFetchAll';
import { MinorCategoryLabels } from '@/constants/minorCategoryLabels';
import { MinorCategoryApi } from '@/api/minorCategoryApi';
import type { MinorCategory } from '@/interface/minorCategory';
import { handleApiError } from '@/utils/handleApiError';

export const MinorCategoryIndex = () => {
  const navigate = useNavigate();
  const {
    data: MinorCategories,
    fetchAll,
    loading,
  } = useFetchAll<MinorCategory>(MinorCategoryApi.index);

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
        <h2 className="text-2xl font-bold text-gray-800 text-center">小分類一覧</h2>
        <Table labels={MinorCategoryLabels} data={MinorCategories} keyField="minorCategoryId" />
      </div>
    </Loading>
  );
};
