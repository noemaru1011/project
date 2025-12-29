import { useNavigate } from 'react-router-dom';
import type { StudentQueryForm } from '@shared/schemas/studentQuery';
import { handleApiError } from '@/utils/handleApiError';
import type { UseFormGetValues } from 'react-hook-form';

export const useStudentSearch = (
  onSearch: (query: StudentQueryForm) => void | Promise<void>,
  getValues: UseFormGetValues<StudentQueryForm>,
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
