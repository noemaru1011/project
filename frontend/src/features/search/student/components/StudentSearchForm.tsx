import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button/Button';
import { StudentSearchAccordion } from '@/features/search/student/components';
import type { StudentSearchInput } from '@shared/models/student';
import { StudentSearchSchema } from '@shared/models/student';

type Props = {
  onSearch: (query: StudentSearchInput) => void;
  onCreate?: () => void;
  loading: boolean;
};

export const StudentSearchForm = ({ onSearch, onCreate, loading }: Props) => {
  const { control, handleSubmit } = useForm<StudentSearchInput>({
    resolver: zodResolver(StudentSearchSchema),
    defaultValues: {
      categoryIds: [],
      subCategoryIds: [],
      minorCategoryIds: [],
      grades: [],
      departmentIds: [],
    },
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit(onSearch)} className="flex flex-col gap-4">
        <StudentSearchAccordion control={control} />
        <div className="flex justify-center gap-4 mt-4">
          {onCreate && (
            <Button type="button" variant="Create" className="w-64" onClick={onCreate} />
          )}
          <Button type="submit" disabled={loading} variant="Search" className="w-64" />
        </div>
      </form>
    </div>
  );
};
