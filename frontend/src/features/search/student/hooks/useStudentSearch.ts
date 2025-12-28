import { useNavigate } from 'react-router-dom';
import type { StudentQuery } from '@/features/search/student/types';
import { handleApiError } from '@/utils/handleApiError';
import type { UseFormGetValues } from 'react-hook-form';

export const useStudentSearch = (
  onSearch: (query: StudentQuery) => void | Promise<void>,
  getValues: UseFormGetValues<StudentQuery>,
) => {
  const navigate = useNavigate();

  const handleSearch = async () => {
    const query = getValues();
    try {
      console.log('チェックされた値:', query);
      await onSearch(query);
    } catch (err) {
      handleApiError(err, navigate);
    }
  };

  return { handleSearch };
};
