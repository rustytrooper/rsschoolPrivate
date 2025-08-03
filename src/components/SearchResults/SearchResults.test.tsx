import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { type PersonSWType } from '../../types/interfaces';
import { SearchResults } from './SearchResults';
import { Provider } from 'react-redux';
import { setupStore, type RootState } from '../../app/store';

describe('SearchResults Component', () => {
  it('should display error message when API call fails', () => {
    const mockProps = {
      descriptions: [],
      error: new Error('Test error message'),
      status: 500,
      onCardClick: () => {},
    };
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
          <SearchResults {...mockProps} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Error occurred: Status 500/i)).toBeInTheDocument();
  });

  it('should show appropriate error for 400 status code', () => {
    const mockProps = {
      descriptions: [],
      error: new Error('Test error message'),
      status: 400,
      onCardClick: () => {},
    };
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
          <SearchResults {...mockProps} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Error occurred: Status 400/i)).toBeInTheDocument();
  });

  it('should display no results message when there are no descriptions', () => {
    const mockProps = {
      descriptions: [],
      error: null,
      status: null,
      onCardClick: () => {},
    };
    const initialState: RootState = {
      card: {
        card: [],
      },
    };

    const store = setupStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchResults {...mockProps} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });

  it('should render a list of Card components when descriptions are provided', () => {
    const mockData: PersonSWType[] = [
      {
        id: 1,
        name: 'Luke Skywalker',
        hair_color: 'Blond',
        sex: 'Male',
        age: 19,
        occupation: 'Jedi',
      },
      {
        id: 2,
        name: 'Darth Vader',
        hair_color: 'Black',
        sex: 'Male',
        age: 45,
        occupation: 'Sith Lord',
      },
    ];

    const mockProps = {
      descriptions: mockData,
      error: new Error('Test error message'),
      status: null,
      onCardClick: () => {},
    };

    const initialState: RootState = {
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
          <SearchResults {...mockProps} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();
  });
});
