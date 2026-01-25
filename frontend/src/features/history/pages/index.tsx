import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { historyApi } from '@/features/history/api';
import { StudentSearchForm } from '@/features/student/components/layouts/StudentSearchForm';
import {
  HistoryTable,
  HistorySearchForm,
  AggregationDashboard,
} from '@/features/history/components/';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import { handleApiErrorWithUI } from '@/utils';
import type { StudentSearchInput } from '@shared/models/student';

export const HistoryIndexPage = () => {
  const navigate = useNavigate();

  // 1. 各検索フォームの「現在の検索条件」を管理するState
  const [historyParams, setHistoryParams] = useState<StudentSearchInput | null>(null);
  const [timeParams, setTimeParams] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 2. 履歴検索
  const { data: historyRes, isFetching: isHistoryLoading } = useQuery({
    queryKey: ['histories', 'search', historyParams, currentPage],
    queryFn: async () => {
      const res = await historyApi.search({ ...historyParams!, page: currentPage, limit: 10 });
      if (historyParams) toast.info(res.message);
      return res;
    },
    enabled: !!historyParams,
    meta: { onError: (err: any) => handleApiErrorWithUI(err, navigate) },
  });

  // 3. 集計検索
  const { data: aggregateRes, isFetching: isTimeLoading } = useQuery({
    queryKey: ['histories', 'aggregate', timeParams],
    queryFn: async () => {
      const res = await historyApi.searchByTime(timeParams!);
      if (timeParams) toast.info(res.message);
      return res;
    },
    enabled: !!timeParams,
    meta: { onError: (err: any) => handleApiErrorWithUI(err, navigate) },
  });

  const handleSearch = (query: StudentSearchInput) => {
    setHistoryParams({ ...query, page: 1, limit: 10 });
    setCurrentPage(1);
  };

  const handleTimeSearch = (query: string) => {
    setTimeParams(query);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 mx-auto max-w-6xl px-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">履歴一覧</h2>

      <div className="space-y-10">
        {/* 上段：時間帯別集計 */}
        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">時間帯別集計検索</h3>
          <HistorySearchForm onSearch={handleTimeSearch} loading={isTimeLoading} />
          {aggregateRes?.data && <AggregationDashboard data={aggregateRes.data} />}
        </section>

        {/* 下段：履歴検索 */}
        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">履歴検索</h3>
          <StudentSearchForm onSearch={handleSearch} loading={isHistoryLoading} />
          <div className="mt-6">
            <HistoryTable
              data={historyRes?.data?.data ?? []}
              loading={isHistoryLoading}
            />
          </div>
          {historyRes?.data?.pagination && historyRes.data.pagination.totalPages > 0 && (
            <Pagination
              pagination={historyRes.data.pagination}
              onPageChange={handlePageChange}
              disabled={isHistoryLoading}
            />
          )}
        </section>
      </div>
    </div>
  );
};
