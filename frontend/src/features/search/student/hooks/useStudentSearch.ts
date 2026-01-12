import { studentSearchApi } from '@/features/search/student/api';
import type { StudentSummary, StudentSearchInput } from '@shared/models/student';
import { useSearch } from '@/hooks/api/useSearch';

export const useStudentSearch = () => {
  const { data, search, loading } = useSearch<StudentSummary, StudentQueryForm>(
    studentSearchApi.search,
  );

  const searchStudents = (data: StudentQueryForm) => search(data);

  return { data, searchStudents, loading };
};
