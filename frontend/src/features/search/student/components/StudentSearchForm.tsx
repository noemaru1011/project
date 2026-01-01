import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button/Button';
import { useStudentSearch } from '@/features/search/student/hooks/useStudentSearch';
import { StudentSearchAccordion } from '@/features/search/student/components';
import type { StudentQueryForm } from '@shared/schemas/studentQuery';
import { validation } from '@shared/schemas/studentQuery';

type Props = {
  onSearch: (query: StudentQueryForm) => void;
  onCreate?: () => void;
};

export const StudentSearchForm = ({ onSearch, onCreate }: Props) => {
  const { control, handleSubmit } = useForm<StudentQueryForm>({
    resolver: zodResolver(validation),
    defaultValues: {
      categoryIds: [],
      subCategoryIds: [],
      minorCategoryIds: [],
      grades: [],
      departmentIds: [],
    },
  });

  const { search } = useStudentSearch();

  const handleSearch = (values: StudentQueryForm) => {
    search(values);
    onSearch(values);
  };

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
