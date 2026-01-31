import { useState } from 'react';
import {
  HistoryCreateForm,
  SelectedStudentsFloat,
  StudentTable,
} from '@/features/history/components';
import { StudentSearchForm } from '@/features/student/components';
import { useSearchStudents } from '@/features/student/hooks/useSearchStudents';
import { useCreateHistory } from '@/features/history/hooks/useCreateHistory';

export const HistoryCreatePage = () => {
  const [selectedStudents, setSelectedStudents] = useState<{ id: string; name: string }[]>([]);

  const { students, isLoading, search } = useSearchStudents();
  const { createHistory, creating } = useCreateHistory();

  return (
    <div className="m-4">
      <h2 className="text-center text-2xl font-bold mt-4">履歴作成</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        {/* 左 */}
        <div>
          <StudentSearchForm onSearch={search} loading={isLoading} />

          <StudentTable
            loading={isLoading}
            data={students}
            selectedStudents={selectedStudents}
            onChangeSelected={setSelectedStudents}
          />
        </div>

        {/* 右 */}
        <div className="sticky top-4 self-start">
          <HistoryCreateForm
            onSubmit={createHistory}
            loading={creating}
            selectedStudents={selectedStudents}
          />
        </div>
      </div>

      {selectedStudents.length > 0 && <SelectedStudentsFloat students={selectedStudents} />}
    </div>
  );
};
