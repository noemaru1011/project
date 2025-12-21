import { useNavigate } from 'react-router-dom';
import { useUpdate } from '@/hooks/useUpdate';
import { handleApiError } from '@/utils';
import { studentApi } from '@/features/student';
import type { StudentUpdateForm } from '@shared/schemas/student';

export const useStudentUpdate = () => {
  const navigate = useNavigate();
  const { update, loading } = useUpdate<StudentUpdateForm>(studentApi.update);

  const updateStudent = async (studentId: string, data: StudentUpdateForm) => {
    try {
      return await update(studentId, data);
    } catch (err) {
      handleApiError(err, navigate);
    }
  };

  return { updateStudent, loading };
};
