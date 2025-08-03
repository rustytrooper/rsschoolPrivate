import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PaginationControls } from './PaginationControls';
import '@testing-library/jest-dom';

describe('PaginationControls', () => {
  const handlePageChange = vi.fn();
  const handleNextPage = vi.fn();
  const handlePreviousPage = vi.fn();

  beforeEach(() => {
    handlePageChange.mockClear();
    handleNextPage.mockClear();
    handlePreviousPage.mockClear();
  });

  it('should render the correct number of page buttons', () => {
    render(
      <PaginationControls
        totalPages={5}
        handlePageChange={handlePageChange}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        currentPage={1}
      />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(7);
  });

  it('should call handlePageChange when a page button is clicked', () => {
    render(
      <PaginationControls
        totalPages={5}
        handlePageChange={handlePageChange}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        currentPage={1}
      />
    );

    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);

    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it('should disable the previous button on the first page', () => {
    render(
      <PaginationControls
        totalPages={5}
        handlePageChange={handlePageChange}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        currentPage={1}
      />
    );

    const previousButton = screen.getByText('<');
    expect(previousButton).toBeDisabled();
  });

  it('should disable the next button on the last page', () => {
    render(
      <PaginationControls
        totalPages={5}
        handlePageChange={handlePageChange}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        currentPage={5}
      />
    );

    const nextButton = screen.getByText('>');
    expect(nextButton).toBeDisabled();
  });

  it('should call handleNextPage when next button is clicked', () => {
    render(
      <PaginationControls
        totalPages={5}
        handlePageChange={handlePageChange}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        currentPage={1}
      />
    );

    const nextButton = screen.getByText('>');
    fireEvent.click(nextButton);

    expect(handleNextPage).toHaveBeenCalled();
  });

  it('should call handlePreviousPage when previous button is clicked', () => {
    render(
      <PaginationControls
        totalPages={5}
        handlePageChange={handlePageChange}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        currentPage={2}
      />
    );

    const previousButton = screen.getByText('<');
    fireEvent.click(previousButton);

    expect(handlePreviousPage).toHaveBeenCalled();
  });

  it('should highlight the current page button', () => {
    render(
      <PaginationControls
        totalPages={5}
        handlePageChange={handlePageChange}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        currentPage={3}
      />
    );

    const activePageButton = screen.getByText('3');
    expect(activePageButton).toHaveClass(
      'bg-gray-200 text-gray-400 cursor-not-allowed scale-100'
    );
  });
});
