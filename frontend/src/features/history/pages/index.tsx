import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { StudentSearchForm } from '@/features/student/components/layouts/StudentSearchForm';
import {
  HistoryTable,
  HistorySearchForm,
  AggregationDashboard,
} from '@/features/history/components';
import { useSearchHistories } from '@/features/history/hooks/useSearchHistories';
import { useAggregateHistories } from '@/features/history/hooks/useAggregateHistories';
import { useDeleteHistory } from '@/features/history/hooks/useDeleteHistory';
import { handleApiErrorWithUI } from '@/utils';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import type { StudentSearchInput } from '@shared/models/student';

export const HistoryIndexPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // --- State ---
  const [historyParams, setHistoryParams] = useState<StudentSearchInput | null>(null);
  const [timeParams, setTimeParams] = useState<string | null>(null);

  // --- Hooks ---
  const {
    histories,
    isLoading: historyLoading,
    isError,
    error,
  } = useSearchHistories(historyParams);
  const {
    aggregate,
    isLoading: aggregateLoading,
    isError: isAggError,
    error: aggError,
  } = useAggregateHistories(timeParams);
  const { deleteHistory, isDeleting } = useDeleteHistory(); // 削除Hook

  // --- Handlers ---

  // 1. 削除ボタンが押された時
  const handleDeleteClick = (id: string) => {
    if (window.confirm('本当に削除してもよろしいですか？')) {
      executeDelete(id);
    }
  };

  // 2. 実際の削除処理
  const executeDelete = (id: string) => {
    deleteHistory(id, {
      onSuccess: () => {
        // 一覧を再取得
        queryClient.invalidateQueries({ queryKey: ['histories'] });
        toast.success(APIMESSAGE.DELETE_SUCCESS);
      },
      onError: (err) => {
        handleApiErrorWithUI(err, navigate);
      },
    });
  };

  // --- Effects ---
  useEffect(() => {
    if (isError && error) handleApiErrorWithUI(error, navigate);
    if (isAggError && aggError) handleApiErrorWithUI(aggError, navigate);
  }, [isError, error, isAggError, aggError, navigate]);

  return (
    <div className="p-4 mx-auto max-w-6xl px-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">履歴一覧</h2>

      <div className="space-y-10">
        {/* ...集計セクション... */}
        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">時間帯別集計検索</h3>
          <HistorySearchForm onSearch={setTimeParams} loading={aggregateLoading} />
          {aggregate && <AggregationDashboard data={aggregate} />}
        </section>

        {/* ...履歴一覧セクション... */}
        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">履歴検索</h3>
          <StudentSearchForm onSearch={setHistoryParams} loading={historyLoading} />

          <div className="mt-6">
            <HistoryTable
              data={histories}
              loading={historyLoading || isDeleting}
              onDelete={handleDeleteClick}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
