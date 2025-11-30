import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { useFetchAll } from '@/hooks/useFetchAll';
import { CategoryLabels } from '@/constants/categoryLabels';
import { CategoryApi } from '@/api/categoryApi';
import type { Category } from '@/interface/category';
import { handleApiError } from '@/utils/handleApiError';

export const CategoryIndex = () => {
  const navigate = useNavigate();
  const { data: Categories, fetchAll, loading } = useFetchAll<Category>(CategoryApi.index);

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
      <Table labels={CategoryLabels} data={Categories} keyField="categoryId" />
    </Loading>
  );
};
