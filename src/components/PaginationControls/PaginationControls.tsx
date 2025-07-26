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
  const arrowButtonClassName =
    'px-3 py-1 cursor-pointer border border-cyan-500 text-cyan-500 rounded-lg hover:bg-cyan-50 transition';
  const disabledClassName =
    'bg-gray-200 text-gray-400 cursor-not-allowed scale-100';
  const pageClassName =
    'px-3 py-1 cursor-pointer text-black hover:text-cyan-500 hover:scale-105 transition';

  return (
    <div className="flex items-center justify-center space-x-4 mt-1">
      <button
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
        onClick={handleNextPage}
        disabled={currentPage >= totalPages}
        className={`${arrowButtonClassName} ${currentPage >= totalPages ? disabledClassName : ''}`}
      >
        {'>'}
      </button>
    </div>
  );
}
