import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../Button/Button';
import type { PaginationInfo } from '@shared/models/common';

type Props = {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

export const Pagination = ({ pagination, onPageChange, disabled }: Props) => {
  const { page, totalPages } = pagination;
  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  const handlePrevious = () => {
    if (!isFirstPage && !disabled) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage && !disabled) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <Button
        type="button"
        variant="Secondary"
        onClick={handlePrevious}
        disabled={isFirstPage || disabled}
        ariaLabel="前のページへ"
        className="flex items-center gap-1"
      >
        <ChevronLeft className="size-4" />
        前へ
      </Button>

      <div className="flex items-center gap-2 text-gray-700">
        <span className="font-semibold">{page}</span>
        <span className="text-gray-400">/</span>
        <span className="font-semibold">{totalPages}</span>
      </div>

      <Button
        type="button"
        variant="Secondary"
        onClick={handleNext}
        disabled={isLastPage || disabled}
        ariaLabel="次のページへ"
        className="flex items-center gap-1"
      >
        次へ
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
};
