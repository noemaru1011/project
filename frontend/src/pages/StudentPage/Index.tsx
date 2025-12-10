import { Table } from '@/components/molecules/Table';
import { Loading } from '@/components/atoms/Loading';
import { StudentLabels } from '@/constants/studentLabels';
import { StudentSearchApi } from '@/api/studentSearchApi';
import type { StudentResult } from '@/interface/student';
import type { StudentQuery } from '@/interface/studentQuery';
import { ROUTES } from '@/constants/routes';
import { useSearch } from '@/hooks/useSearch';
import type { Action } from '@/components/molecules/TableRowActions';
import { StudentSearchPanel } from '@/pages/studentPage/search';

export const StudentIndex = () => {
  const { data, loading, search } = useSearch<StudentResult, StudentQuery>(StudentSearchApi.search);

  const actions: Action[] = ['Update', 'Read', 'Delete'];

  const routeMap: Record<Action, (id: string) => string> = {
    Update: (id) => ROUTES.STUDENT.UPDATE(id),
    Read: (id) => ROUTES.STUDENT.VIEW(id),
    Delete: (id) => ROUTES.STUDENT.DELETE(id),
  };

  return (
    <div className="p-4 mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center">学生一覧</h2>
      {/* 検索フォームを配置 */}
      <StudentSearchPanel onSearch={search} />
      <Loading loading={loading}>
        <Table
          labels={StudentLabels}
          data={data}
          keyField="studentId"
          actions={actions}
          routeMap={routeMap}
        />
      </Loading>
    </div>
  );
};
