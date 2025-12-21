import { useState } from 'react';
import {
  StudentSearchSection,
  HistoryCreateForm,
  SelectedStudentsFloat,
} from '@/features/history/components';

export const HistoryCreatePage = () => {
  const [selectedStudents, setSelectedStudents] = useState<{ id: string; name: string }[]>([]);

  return (
    <div className="m-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
      <StudentSearchSection
        selectedStudents={selectedStudents}
        onChangeSelected={setSelectedStudents}
      />

      <HistoryCreateForm selectedStudents={selectedStudents} />

      {selectedStudents.length > 0 && <SelectedStudentsFloat students={selectedStudents} />}
    </div>
  );
};
