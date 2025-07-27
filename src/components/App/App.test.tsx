import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../../App';
import { MemoryRouter } from 'react-router';
import type { PersonSWType } from '../../types/interfaces';
import { personService } from '../../shared/personService';
import '@testing-library/jest-dom';

describe('App Component', () => {
  const service = new personService();

  it('mocks fetchData method', async () => {
    const mockData: PersonSWType[] = [
      {
        id: 1,
        name: 'Stan Marsh',
        age: 10,
        sex: 'male',
        occupation: 'student',
        hair_color: 'black',
      },
    ];

    const spy = vi.spyOn(service, 'fetchData').mockImplementation(async () => {
      return { dataFetched: mockData, errorMessage: null };
    });

    const result = await service.fetchData(1);
    expect(result).toEqual({ dataFetched: mockData, errorMessage: null });
    expect(spy).toHaveBeenCalledWith(1);
    expect(spy).toHaveReturnedWith(
      Promise.resolve({ dataFetched: mockData, errorMessage: null })
    );
  });

  it('mocks fetchCharacterData method', async () => {
    const mockCharacter: PersonSWType = {
      id: 1,
      name: 'Stan Marsh',
      age: 10,
      sex: 'male',
      occupation: 'student',
      hair_color: 'black',
    };

    const spy = vi
      .spyOn(service, 'fetchCharacterData')
      .mockImplementation(async () => {
        return { dataFetched: mockCharacter, errorMessage: null };
      });

    const result = await service.fetchCharacterData(1);
    expect(result).toEqual({ dataFetched: mockCharacter, errorMessage: null });
    expect(spy).toHaveBeenCalledWith(1);
    expect(spy).toHaveReturnedWith(
      Promise.resolve({ dataFetched: mockCharacter, errorMessage: null })
    );
  });
  it('renders loading indicator initially', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getByTestId('loader')).toBeInTheDocument();
  });

  it('has appropriate ARIA labels for screen readers', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const loader = getByTestId('loader');
    expect(loader).toHaveAttribute('aria-label', 'Loading...');
  });

  it('renders loading indicator initially', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('has appropriate ARIA labels for screen readers', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveAttribute('aria-label', 'Loading...');
  });
});
