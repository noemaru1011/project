import { useForm } from 'react-hook-form';
import type { StudentQuery } from '@/features/search/student/types';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '@/utils/handleApiError';

export const useStudentSearch = (onSearch: (query: StudentQuery) => void | Promise<void>) => {
  const navigate = useNavigate();
  const { handleSubmit, control, getValues } = useForm<StudentQuery>({
    defaultValues: {
      categoryId: [],
      subCategoryId: [],
      minorCategoryId: [],
      grade: [],
      departmentId: [],
    },
  });

  const handleSearch = async () => {
    const query = getValues();
    try {
      console.log('チェックされた値:', query);
      await onSearch(query);
    } catch (err) {
      handleApiError(err, navigate);
    }
  };

  return { control, handleSubmit, handleSearch };
};
