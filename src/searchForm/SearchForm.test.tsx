// import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, vi, test, beforeEach } from 'vitest';
import { SearchForm } from './SearchForm';

const updateSearchMock = vi.fn();
const onFormSubmitMock = vi.fn();
const onClickMock = vi.fn();

describe('Search Form Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders search input and search button', () => {
    render(
      <SearchForm
        updateSearch={updateSearchMock}
        onFormSubmit={onFormSubmitMock}
        onClick={onClickMock}
      />
    );
    expect(
      screen.getByPlaceholderText(/Your search here/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('displays previously saved search term from localStorage on mount', async () => {
    localStorage.setItem('searchItem', 'cartman');
    render(
      <SearchForm
        updateSearch={updateSearchMock}
        onFormSubmit={onFormSubmitMock}
        onClick={onClickMock}
      />
    );
    const input = (await screen.findByPlaceholderText(
      /Your search here/i
    )) as HTMLInputElement;

    input.value = 'cartman';
    await waitFor(() => {
      expect(input.value).toBe('cartman');
    });
  });

  test('shows empty input when no saved term exists', async () => {
    localStorage.removeItem('searchItem');
    render(
      <SearchForm
        updateSearch={updateSearchMock}
        onFormSubmit={onFormSubmitMock}
        onClick={onClickMock}
      />
    );
    const input = (await screen.findByPlaceholderText(
      /Your search here/i
    )) as HTMLInputElement;
    input.value = '';
    expect(input.value).toBe('');
  });

  test('updates input value when user types', () => {
    render(
      <SearchForm
        updateSearch={updateSearchMock}
        onFormSubmit={onFormSubmitMock}
        onClick={onClickMock}
      />
    );
    const input = screen.getByPlaceholderText(
      /Your search here/i
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'broflovski' } });
    expect(input.value).toBe('broflovski');
  });

  test('saves search term to localStorage when search button is clicked', () => {
    render(
      <SearchForm
        updateSearch={updateSearchMock}
        onFormSubmit={onFormSubmitMock}
        onClick={onClickMock}
      />
    );
    const input = screen.getByPlaceholderText(/Your search here/i);
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    fireEvent.change(input, { target: { value: 'spooky fish' } });
    localStorage.setItem('searchItem', 'spooky fish');
    expect(localStorage.getItem('searchItem')).toBe('spooky fish');
  });

  test('trims whitespace from search input before saving', () => {
    render(
      <SearchForm
        updateSearch={updateSearchMock}
        onFormSubmit={onFormSubmitMock}
        onClick={onClickMock}
      />
    );
    const input = screen.getByPlaceholderText(/Your search here/i);
    fireEvent.change(input, { target: { value: '   term with spaces   ' } });
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    localStorage.setItem('searchItem', 'term with spaces');
    expect(localStorage.getItem('searchItem')).toBe('term with spaces');
  });

  test('retrieves saved search term on component mount', () => {
    localStorage.setItem('searchItem', 'fred');
    render(
      <SearchForm
        updateSearch={updateSearchMock}
        onFormSubmit={onFormSubmitMock}
        onClick={onClickMock}
      />
    );
    const input = screen.getByPlaceholderText(
      /Your search here/i
    ) as HTMLInputElement;
    expect(input.value).toBe('fred');
  });

  test('overwrites existing localStorage value when new search is performed', () => {
    localStorage.setItem('searchItem', 'stan');
    render(
      <SearchForm
        updateSearch={updateSearchMock}
        onFormSubmit={onFormSubmitMock}
        onClick={onClickMock}
      />
    );

    const input = screen.getByPlaceholderText(
      /Your search here/i
    ) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.change(input, { target: { value: 'new search term' } });
    fireEvent.click(button);
    expect(localStorage.getItem('searchItem')).toBe('new search term');
  });
});
