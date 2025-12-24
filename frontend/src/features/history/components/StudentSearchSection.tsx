import { Table } from '@/components/ui/Table/Table';
import { Loading } from '@/components/ui/Loading/Loading';
import { historySearchLabels } from '@/features/history/constants/historyLabels';
import { studentSearchApi } from '@/features/search/student';
import { useSearch } from '@/hooks/useSearch';
import type { StudentQuery } from '@/features/search/student/types';
import { StudentSearchPanel } from '@/features/search/student/components';
import { StudentTable } from '@/features/student/components';
import type { StudentResult } from '@/features/student/types';

type Props = {
  selectedStudents: { id: string; name: string }[];
  onChangeSelected: (students: { id: string; name: string }[]) => void;
};

export const StudentSearchSection = ({ selectedStudents, onChangeSelected }: Props) => {
  const { search, data, loading } = useSearch<StudentResult, StudentQuery>(studentSearchApi.search);

  return (
    <div className="w-full">
      <StudentSearchPanel onSearch={search} />

      <Loading loading={loading}>
        <Table
          labels={historySearchLabels}
          data={data}
          keyField="studentId"
          showCheckbox
          selectedIds={selectedStudents.map((s) => s.id)}
          onSelect={(id, checked) => {
            const student = data.find((s) => String(s.studentId) === id);
            if (!student) return;

            const updated = checked
              ? [...selectedStudents, { id, name: student.studentName }]
              : selectedStudents.filter((x) => x.id !== id);

            onChangeSelected(updated);
          }}
        />
      </Loading>
    </div>
  );
};
