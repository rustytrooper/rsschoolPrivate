import { describe, it, expect, vi } from 'vitest';
import { personService } from './personService';
import type { PersonSWType } from '../types/interfaces';

describe('personService', () => {
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
});
