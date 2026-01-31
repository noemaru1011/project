import { useState } from 'react';
import { StudentSearchForm } from '@/features/student/components/layouts/StudentSearchForm';
import {
  HistoryTable,
  HistorySearchForm,
  AggregationDashboard,
} from '@/features/history/components';
import type { StudentSearchInput } from '@shared/models/student';
import { useSearchHistories } from '@/features/history/hooks/useSearchHistories';
import { useAggregateHistories } from '@/features/history/hooks/useAggregateHistories';

export const HistoryIndexPage = () => {
  // 検索条件だけを Page で持つ
  const [historyParams, setHistoryParams] = useState<StudentSearchInput | null>(null);
  const [timeParams, setTimeParams] = useState<string | null>(null);

  const { histories, loading: historyLoading } = useSearchHistories(historyParams);

  const { aggregate, loading: aggregateLoading } = useAggregateHistories(timeParams);

  return (
    <div className="p-4 mx-auto max-w-6xl px-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">履歴一覧</h2>

      <div className="space-y-10">
        {/* 上段：時間帯別集計 */}
        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">時間帯別集計検索</h3>
          <HistorySearchForm onSearch={setTimeParams} loading={aggregateLoading} />
          {aggregate && <AggregationDashboard data={aggregate} />}
        </section>

        {/* 下段：履歴検索 */}
        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">履歴検索</h3>
          <StudentSearchForm onSearch={setHistoryParams} loading={historyLoading} />
          <div className="mt-6">
            <HistoryTable data={histories} loading={historyLoading} />
          </div>
        </section>
      </div>
    </div>
  );
};
