import { Button } from '@/components/ui/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useStudentSearch } from '@/features/search/student/hooks/useStudentSearch';
import { StudentSearchAccordion } from './StudentSearchAccordion';

type Props = {
  onSearch: () => void;
};

export const StudentSearchPanel = ({ onSearch }: Props) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { control, handleSubmit, handleSearch } = useStudentSearch(onSearch);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit(handleSearch)} className="flex flex-col gap-4">
        <StudentSearchAccordion control={control} />
        <div className="flex justify-center gap-4 mt-4">
          {pathname === ROUTES.STUDENT.INDEX && (
            <Button
              type="button"
              variant="Create"
              className="w-64 mx-auto py-2"
              onClick={() => navigate(ROUTES.STUDENT.CREATE)}
            />
          )}
          <Button type="submit" variant="Search" className="w-64 mx-auto py-2" />
        </div>
      </form>
    </div>
  );
};
