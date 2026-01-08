import { studentSearchApi } from '@/features/search/student/api';
import type { StudentResult } from '@/features/student/types';
import type { StudentQueryForm } from '@shared/schemas/studentQuery';
import { useSearch } from '@/hooks/api/useSearch';

export const useStudentSearch = () => {
  const { data, search, loading } = useSearch<StudentResult, StudentQueryForm>(
    studentSearchApi.search,
  );

  const searchStudents = (data: StudentQueryForm) => search(data);

  return { data, searchStudents, loading };
};
