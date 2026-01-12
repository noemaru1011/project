import { Table } from '@/components/ui/Table/Table';
import { historySearchLabels } from '@/features/history/constants/historyLabels';
import type { StudentSummary } from '@shared/models/student';

type Props = {
  data: StudentSummary[];
  selectedStudents: { id: string; name: string }[];
  onChangeSelected: (students: { id: string; name: string }[]) => void;
};

export const StudentTable = ({ data, selectedStudents, onChangeSelected }: Props) => {
  return (
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
  );
};
