import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // 追加
import {
  HistoryCreateForm,
  SelectedStudentsFloat,
  StudentTable,
} from '@/features/history/components';
import { StudentSearchForm } from '@/features/student/components';
import { studentApi } from '@/features/student';
import { historyApi } from '@/features/history';
import { ROUTES } from '@/routes/routes';
import { handleApiErrorWithUI } from '@/utils/handleApiError';
import type { HistoryCreateInput } from '@shared/models/history';
import type { StudentSearchInput } from '@shared/models/student';

export const HistoryCreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedStudents, setSelectedStudents] = useState<{ id: string; name: string }[]>([]);

  const [searchParams, setSearchParams] = useState<StudentSearchInput | null>(null);

  const { data: studentResponse, isFetching: searching } = useQuery({
    queryKey: ['students', searchParams],
    queryFn: () => studentApi.search(searchParams!),
    enabled: !!searchParams,
    meta: {
      onError: (err: any) => handleApiErrorWithUI(err, navigate),
    },
  });

  const students = studentResponse?.data ?? [];

  const createMutation = useMutation({
    mutationFn: (data: HistoryCreateInput) => historyApi.create(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['histories'] });
      toast.success(res.message);
      navigate(ROUTES.HISTORY.INDEX);
    },
    onError: (err) => handleApiErrorWithUI(err, navigate),
  });

  const handleSearch = (query: StudentSearchInput) => {
    setSearchParams(query);
  };

  const onSubmit = (data: HistoryCreateInput) => {
    createMutation.mutate(data);
  };

  return (
    <div className="m-4">
      <h2 className="text-center text-2xl font-bold mt-4">履歴作成</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        {/* 左カラム */}
        <div>
          <StudentSearchForm onSearch={handleSearch} loading={searching} />

          <StudentTable
            loading={searching}
            data={students}
            selectedStudents={selectedStudents}
            onChangeSelected={setSelectedStudents}
          />
        </div>

        {/* 右カラム（sticky） */}
        <div className="sticky top-4 self-start">
          <HistoryCreateForm
            onSubmit={onSubmit}
            loading={createMutation.isPending}
            selectedStudents={selectedStudents}
          />
        </div>
      </div>

      {selectedStudents.length > 0 && <SelectedStudentsFloat students={selectedStudents} />}
    </div>
  );
};
