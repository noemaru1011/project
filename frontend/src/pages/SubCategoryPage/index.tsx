import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { useFetchAll } from '@/hooks/useFetchAll';
import { SubCategoryLabels } from '@/constants/subCategoryLabels';
import { SubCategoryApi } from '@/api/subCategoryApi';
import type { SubCategory } from '@/interface/subCategory';
import { handleApiError } from '@/utils/handleApiError';

export const SubCategoryIndex = () => {
  const navigate = useNavigate();
  const { data: subCategories, fetchAll, loading } = useFetchAll<SubCategory>(SubCategoryApi.index);

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
        <Table labels={SubCategoryLabels} data={subCategories} keyField="subCategoryName" />
      </div>
    </Loading>
  );
};
