import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button/Button';
import { useStudentSearch } from '@/features/search/student/hooks/useStudentSearch';
import { StudentSearchAccordion } from '@/features/search/student/components';
import type { StudentQuery } from '@/features/search/student';

type Props = {
  onSearch: (query: StudentQuery) => void;
  onCreate?: () => void;
};

export const StudentSearchPanel = ({ onSearch, onCreate }: Props) => {
  const { control, handleSubmit, getValues } = useForm<StudentQuery>({
    defaultValues: {
      categoryId: [],
      subCategoryId: [],
      minorCategoryId: [],
      grade: [],
      departmentId: [],
    },
  });

  const { handleSearch } = useStudentSearch(onSearch, getValues);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit(handleSearch)} className="flex flex-col gap-4">
        <StudentSearchAccordion control={control} />
        <div className="flex justify-center gap-4 mt-4">
          {onCreate && (
            <Button type="button" variant="Create" className="w-64" onClick={onCreate} />
          )}
          <Button type="submit" variant="Search" className="w-64" />
        </div>
      </form>
    </div>
  );
};
