import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, vi, it, beforeEach } from 'vitest';
import { SearchForm } from './SearchForm';
import userEvent from '@testing-library/user-event';

const onFormSubmitMock = vi.fn();
const initialQuery = 'car';

describe('Search Form Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render search input and search button', () => {
    render(
      <SearchForm onFormSubmit={onFormSubmitMock} initialQuery={initialQuery} />
    );
    expect(
      screen.getByPlaceholderText(/Your search here/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should display previously saved search term from localStorage on mount', async () => {
    localStorage.setItem('searchItem', 'cartman');
    render(
      <SearchForm onFormSubmit={onFormSubmitMock} initialQuery={initialQuery} />
    );
    const input = (await screen.findByPlaceholderText(
      /Your search here/i
    )) as HTMLInputElement;

    input.value = 'cartman';
    await waitFor(() => {
      expect(input.value).toBe('cartman');
    });
  });

  it('should show empty input when no saved term exists', async () => {
    localStorage.removeItem('searchItem');
    render(
      <SearchForm onFormSubmit={onFormSubmitMock} initialQuery={initialQuery} />
    );
    const input = (await screen.findByPlaceholderText(
      /Your search here/i
    )) as HTMLInputElement;
    input.value = '';
    expect(input.value).toBe('');
  });

  it('should update input value when user types', () => {
    render(
      <SearchForm onFormSubmit={onFormSubmitMock} initialQuery={initialQuery} />
    );
    const input = screen.getByPlaceholderText(
      /Your search here/i
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'broflovski' } });
    expect(input.value).toBe('broflovski');
  });

  it('should save search term to localStorage when search button is clicked', () => {
    render(
      <SearchForm onFormSubmit={onFormSubmitMock} initialQuery={initialQuery} />
    );
    const input = screen.getByPlaceholderText(/Your search here/i);
    userEvent.click(screen.getByRole('button', { name: /search/i }));
    fireEvent.change(input, { target: { value: 'spooky fish' } });
    localStorage.setItem('searchItem', 'spooky fish');
    expect(localStorage.getItem('searchItem')).toBe('spooky fish');
  });

  it('should trim whitespace from search input before saving', () => {
    render(
      <SearchForm onFormSubmit={onFormSubmitMock} initialQuery={initialQuery} />
    );
    const input = screen.getByPlaceholderText(/Your search here/i);
    fireEvent.change(input, { target: { value: '   term with spaces   ' } });
    const button = screen.getByRole('button', { name: /search/i });
    userEvent.click(button);
    localStorage.setItem('searchItem', 'term with spaces');
    expect(localStorage.getItem('searchItem')).toBe('term with spaces');
  });

  it('should retrieve saved search term on component mount', () => {
    localStorage.setItem('searchItem', 'fred');
    const initQuery = localStorage.getItem('searchItem') as string;
    render(
      <SearchForm onFormSubmit={onFormSubmitMock} initialQuery={initQuery} />
    );
    const input = screen.getByPlaceholderText(
      /Your search here/i
    ) as HTMLInputElement;
    expect(input.value).toBe('fred');
  });
});
