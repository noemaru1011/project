import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { useFetchAll } from '@/hooks/useFetchAll';
import { subCategoryLabels } from '@/features/subCategory/constants/labels';
import { subCategoryApi } from '@/features/subCategory';
import type { SubCategory } from '@/features/subCategory/types';
import { handleApiError } from '@/utils/handleApiError';

export const SubCategoryIndex = () => {
  const navigate = useNavigate();
  const { data: subCategories, fetchAll, loading } = useFetchAll<SubCategory>(subCategoryApi.index);

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
        <h2 className="text-2xl font-bold text-gray-800 text-center">中分類一覧</h2>
        <Table labels={subCategoryLabels} data={subCategories} keyField="subCategoryName" />
      </div>
    </Loading>
  );
};
