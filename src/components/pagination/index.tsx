import clsx from 'clsx';
import Prev from '@/assets/icons/prevArrow.svg';
import Next from '@/assets/icons/nextArrow.svg';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === totalPages;
  const noneItem = totalPages === 0;

  return (
    <div className={clsx(noneItem ? 'hidden' : 'flex w-full justify-center')}>
      <button
        disabled={firstPage}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Prev className={clsx(firstPage ? 'text-gray300' : 'text-gray950')} />
      </button>
      {pages.map((page) => {
        const current = currentPage === page;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={clsx(
              current ? 'border-primary500 border-b-2' : 'text-gray300',
              'text-14-b h-10 w-10'
            )}
          >
            {page}
          </button>
        );
      })}
      <button disabled={lastPage} onClick={() => onPageChange(currentPage + 1)}>
        <Next className={clsx(lastPage ? 'text-gray300' : 'text-gray950')} />
      </button>
    </div>
  );
}
