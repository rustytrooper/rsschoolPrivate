import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import App from '../../App';
import { setupStore } from '../../app/store';
import { PersonService } from '../../shared/personService';
import type { PersonSWType } from '../../types/interfaces';

describe('App Component', () => {
  it('should mock fetchData method', async () => {
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

    const spy = vi
      .spyOn(PersonService, 'fetchData')
      .mockImplementation(async () => {
        return { dataFetched: mockData, errorMessage: null };
      });

    const result = await PersonService.fetchData(1);
    expect(result).toEqual({ dataFetched: mockData, errorMessage: null });
    expect(spy).toHaveBeenCalledWith(1);
    expect(spy).toHaveReturnedWith(
      Promise.resolve({ dataFetched: mockData, errorMessage: null })
    );
  });

  it('should mock fetchCharacterData method', async () => {
    const mockCharacter: PersonSWType = {
      id: 1,
      name: 'Stan Marsh',
      age: 10,
      sex: 'male',
      occupation: 'student',
      hair_color: 'black',
    };

    const spy = vi
      .spyOn(PersonService, 'fetchCharacterData')
      .mockImplementation(async () => {
        return { dataFetched: mockCharacter, errorMessage: null };
      });

    const result = await PersonService.fetchCharacterData(1);
    expect(result).toEqual({ dataFetched: mockCharacter, errorMessage: null });
    expect(spy).toHaveBeenCalledWith(1);
    expect(spy).toHaveReturnedWith(
      Promise.resolve({ dataFetched: mockCharacter, errorMessage: null })
    );
  });
  it('should render loading indicator initially', () => {
    const initialState = {
      card: {
        card: [
          {
            id: 1,
            name: 'Luke Skywalker',
            hair_color: 'Blond',
            sex: 'Male',
            age: 19,
            occupation: 'Jedi',
          },
        ],
      },
    };

    const store = setupStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should have appropriate ARIA labels for screen readers', () => {
    const initialState = {
      card: {
        card: [
          {
            id: 1,
            name: 'Luke Skywalker',
            hair_color: 'Blond',
            sex: 'Male',
            age: 19,
            occupation: 'Jedi',
          },
        ],
      },
    };

    const store = setupStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toHaveAttribute('aria-label', 'Loading...');
  });

  it('should render loading indicator initially', () => {
    const initialState = {
      card: {
        card: [
          {
            id: 1,
            name: 'Luke Skywalker',
            hair_color: 'Blond',
            sex: 'Male',
            age: 19,
            occupation: 'Jedi',
          },
        ],
      },
    };

    const store = setupStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should have appropriate ARIA labels for screen readers', () => {
    const initialState = {
      card: {
        card: [
          {
            id: 1,
            name: 'Luke Skywalker',
            hair_color: 'Blond',
            sex: 'Male',
            age: 19,
            occupation: 'Jedi',
          },
        ],
      },
    };

    const store = setupStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toHaveAttribute('aria-label', 'Loading...');
  });

  it('should set state after fetching data', async () => {
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

    const spy = vi.spyOn(PersonService, 'fetchData').mockResolvedValue({
      dataFetched: mockData,
      errorMessage: null,
    });

    const initialState = {
      card: { card: [] },
    };

    const store = setupStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/Stan Marsh/i)).toBeInTheDocument();
    expect(spy).toHaveBeenCalled();
  });
});
