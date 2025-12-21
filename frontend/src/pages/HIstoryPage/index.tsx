import { Table } from '@/components/ui/Table/Table';
import { Loading } from '@/components/ui/Loading/Loading';
import { HistoryResultLabels } from '@/constants/historyLabels';
import { HistorySearchApi } from '@/api/historySearchApi';
import type { HistoryResult } from '@/interface/history';
import type { HistoryQuery } from '@/interface/historyQuery';
import { ROUTES } from '@/constants/routes';
import { useSearch } from '@/hooks/useSearch';
import type { Action } from '@/components/ui/Table/TableRowActions';
import { StudentSearchPanel } from '@/features/search/student/components/StudentSearchForm';

export const HistoryIndex = () => {
  const { data, loading, search } = useSearch<HistoryResult, HistoryQuery>(HistorySearchApi.search);

  const actions: Action[] = ['Update', 'Delete'];

  //studentのまま
  const routeMap: Record<Action, (id: string) => string> = {
    Update: (id) => ROUTES.HISTORY.UPDATE(id),
    Read: (id) => ROUTES.STUDENT.VIEW(id),
    Delete: (id) => ROUTES.HISTORY.DELETE(id),
  };

  return (
    <div className="p-4 mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center">履歴一覧</h2>
      {/* 検索フォームを配置 */}
      <StudentSearchPanel onSearch={search} />
      <Loading loading={loading}>
        <Table
          labels={HistoryResultLabels}
          data={data}
          keyField="historyId"
          actions={actions}
          routeMap={routeMap}
        />
      </Loading>
    </div>
  );
};
