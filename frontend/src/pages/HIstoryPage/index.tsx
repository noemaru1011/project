import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { useFetchAll } from '@/hooks/useFetchAll';
import { DepartmentLabels } from '@/constants/departmentLabels';
import { DepartmentAPi } from '@/api/departmentApi';
import type { Department } from '@/interface/department';
import { handleApiError } from '@/utils/handleApiError';

export const DepartmentIndex = () => {
  const navigate = useNavigate();
  const { data: Departments, fetchAll, loading } = useFetchAll<Department>(DepartmentAPi.index);

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
        <Table labels={DepartmentLabels} data={Departments} keyField="departmentId" />
      </div>
    </Loading>
  );
};
