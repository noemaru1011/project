import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { useFetchAll } from '@/hooks/useFetchAll';
import { categoryLabels } from '@/features/category/constants';
import { categoryApi } from '@/features/category';
import type { Category } from '@/features/category';
import { handleApiError } from '@/utils/handleApiError';

export const CategoryIndex = () => {
  const navigate = useNavigate();
  const { data: Categories, fetchAll, loading } = useFetchAll<Category>(categoryApi.index);

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
        <h2 className="text-2xl font-bold text-gray-800 text-center">大分類一覧</h2>
        <Table labels={categoryLabels} data={Categories} keyField="categoryId" />
      </div>
    </Loading>
  );
};
