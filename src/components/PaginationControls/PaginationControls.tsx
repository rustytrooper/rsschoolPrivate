import { PaginationControlsStyles } from './paginationStyles';

interface PaginationControlsProps {
  totalPages: number;
  handlePageChange: (page: number) => void;
  handleNextPage: VoidFunction;
  handlePreviousPage: VoidFunction;
  currentPage: number;
}

export function PaginationControls({
  totalPages,
  handlePageChange,
  handleNextPage,
  handlePreviousPage,
  currentPage,
}: PaginationControlsProps) {
  const { arrowButtonClassName, disabledClassName, pageClassName } =
    PaginationControlsStyles();

  return (
    <div className="flex items-center justify-center space-x-4 mt-1">
      <button
        data-testid="previous-button"
        onClick={handlePreviousPage}
        disabled={currentPage <= 1}
        className={`${arrowButtonClassName} ${currentPage <= 1 ? disabledClassName : ''}`}
      >
        {'<'}
      </button>
      {[...Array(totalPages)].map((_, i) => {
        const isActivePage = i + 1 === currentPage;
        return (
          <button
            onClick={() => {
              handlePageChange(i + 1);
            }}
            key={i}
            disabled={isActivePage}
            className={
              isActivePage
                ? `${pageClassName} ${disabledClassName}`
                : pageClassName
            }
          >
            {i + 1}
          </button>
        );
      })}
      <button
        data-testid="next-button"
        onClick={handleNextPage}
        disabled={currentPage >= totalPages}
        className={`${arrowButtonClassName} ${currentPage >= totalPages ? disabledClassName : ''}`}
      >
        {'>'}
      </button>
    </div>
  );
}
