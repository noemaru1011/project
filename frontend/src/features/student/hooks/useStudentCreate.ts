import { useNavigate } from 'react-router-dom';
import { useCreate } from '@/hooks/useCreate';
import { studentApi } from '@/features/student';
import { handleApiError } from '@/utils/handleApiError';
import type { StudentForm } from '@shared/schemas/student';

export const useStudentCreate = () => {
  const navigate = useNavigate();
  const { create, loading } = useCreate<StudentForm>(studentApi.create);

  const createStudent = async (data: StudentForm) => {
    try {
      return await create(data);
    } catch (err) {
      handleApiError(err, navigate);
    }
  };

  return { createStudent, loading };
};
