import { Table } from '@/components/ui/Table/Table';
import { Loading } from '@/components/ui/Loading/Loading';
import { historySearchLabels } from '@/features/history/constants/historyLabels';
import { useStudentSearch } from '@/features/search/student/hooks/useStudentSearch';
import { StudentSearchForm } from '@/features/search/student/components';

type Props = {
  selectedStudents: { id: string; name: string }[];
  onChangeSelected: (students: { id: string; name: string }[]) => void;
};

export const StudentSearchSection = ({ selectedStudents, onChangeSelected }: Props) => {
  const { search, data, loading } = useStudentSearch();

  return (
    <div className="w-full">
      <StudentSearchForm onSearch={search} />

      <Loading loading={loading}>
        <Table
          labels={historySearchLabels}
          data={data}
          keyField="studentId"
          showCheckbox
          selectedIds={selectedStudents.map((s) => s.id)}
          onSelect={(id, checked) => {
            const student = data.find((s) => s.studentId === id);
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
