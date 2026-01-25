import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { StudentSearchForm } from '@/features/student/components/layouts/StudentSearchForm';
import { StudentTable } from '@/features/student/components';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import { studentApi } from '@/features/student';
import { ROUTES } from '@/routes/routes';
import { handleApiErrorWithUI } from '@/utils';
import type { StudentSearchInput } from '@shared/models/student';

export const StudentIndexPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<StudentSearchInput>({ page: 1, limit: 10 });
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['students', searchParams, currentPage],
    queryFn: async () => {
      const res = await studentApi.search({ ...searchParams, page: currentPage, limit: 10 });
      if (searchParams) {
        toast.info(res.message);
      }
      return res;
    },
    meta: {
      onError: (err: any) => handleApiErrorWithUI(err, navigate),
    },
  });

  const students = response?.data?.data ?? [];
  const pagination = response?.data?.pagination;

  const handleSearch = (query: StudentSearchInput) => {
    setSearchParams({ ...query, page: 1, limit: 10 });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
      {pagination && pagination.totalPages > 0 && (
        <Pagination
          pagination={pagination}
          onPageChange={handlePageChange}
          disabled={isLoading || isFetching}
        />
      )}
    </div>
  );
};
