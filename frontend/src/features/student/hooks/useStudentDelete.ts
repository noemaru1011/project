import { useNavigate } from 'react-router-dom';
import { studentApi } from '@/features/student';
import { handleApiError } from '@/utils';
import { useDelete } from '@/hooks/useDelete';

export const useStudentDelete = () => {
  const navigate = useNavigate();
  const { remove, loading } = useDelete(studentApi.delete);

  const deleteStudent = async (studentId: string) => {
    try {
      return await remove(studentId);
    } catch (err) {
      handleApiError(err, navigate);
    }
  };

  return { deleteStudent, loading };
};
