import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { studentApi } from '@/features/student';
import { handleApiErrorWithUI } from '@/utils';
import type { StudentSearchInput } from '@shared/models/student';

export const useSearchStudents = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<StudentSearchInput | null>(null);

  const query = useQuery({
    queryKey: ['students', searchParams],
    queryFn: async () => {
      const res = await studentApi.search(searchParams ?? {});
      toast.info(res.message);
      return res;
    },
    enabled: false,
    meta: {
      onError: (err: any) => handleApiErrorWithUI(err, navigate),
    },
  });

  const search = (params: StudentSearchInput) => {
    setSearchParams(params);
    query.refetch();
  };

  return {
    students: query.data?.data ?? [],
    search,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
  };
};
