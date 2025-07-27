import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router';

import { CardDetails } from './DetailsPanel';
import { personService } from '../../shared/personService';
import type { PersonSWType } from '../../types/interfaces';
import '@testing-library/jest-dom';

describe('CardDetails', () => {
  const service = new personService();

  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  it('handles loading state correctly', async () => {
    vi.spyOn(service, 'fetchCharacterData').mockImplementationOnce(() => {
      return new Promise(() => {});
    });

    render(
      <MemoryRouter initialEntries={['/card/1']}>
        <CardDetails />
      </MemoryRouter>
    );

    expect(
      screen.queryByText(/A South Park character with the name/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/hair color/i)).not.toBeInTheDocument();
  });
});
