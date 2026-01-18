import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { StudentSearchForm } from '@/features/student/components/layouts/StudentSearchForm';
import { StudentTable } from '@/features/student/components';
import { studentApi } from '@/features/student';
import { ROUTES } from '@/routes/routes';
import { handleApiErrorWithUI } from '@/utils';
import type { StudentSearchInput } from '@shared/models/student';

export const StudentIndexPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<StudentSearchInput>({});

  const {
    data: response,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['students', searchParams],
    queryFn: async () => {
      const res = await studentApi.search(searchParams);
      if (Object.keys(searchParams).length > 0) {
        toast.info(res.message);
      }
      return res;
    },
    meta: {
      onError: (err: any) => handleApiErrorWithUI(err, navigate),
    },
  });

  const students = response?.data ?? [];

  const handleSearch = (query: StudentSearchInput) => {
    setSearchParams(query);
  };

  return (
    <div className="p-4 mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center">学生一覧</h2>
      <StudentSearchForm
        onSearch={handleSearch}
        loading={isLoading || isFetching}
        onCreate={() => navigate(ROUTES.STUDENT.CREATE)}
      />
      <StudentTable
        loading={isLoading || isFetching}
        data={students}
        actions={['Update', 'Read', 'Delete']}
      />
    </div>
  );
};
