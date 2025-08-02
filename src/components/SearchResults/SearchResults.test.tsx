import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { type PersonSWType } from '../../types/interfaces';
import { SearchResults } from './SearchResults';
import { MemoryRouter } from 'react-router';
// import { renderWithProviders } from '../../features/testUtils';
import { Provider } from 'react-redux';
import { setupStore } from '../../app/store';
// import store from '../../app/store';

describe('SearchResults Component', () => {
  it('displays error message when API call fails', () => {
    const mockProps = {
      descriptions: [],
      error: true,
      status: 500,
      errorMessage: 'Internal Server Error',
      onCardClick: () => {},
    };
    const initialState = {
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
    };

    const store = setupStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchResults {...mockProps} />
        </MemoryRouter>
      </Provider>
    );

    // renderWithProviders(
    //   <MemoryRouter>
    //     <SearchResults {...mockProps} />
    //   </MemoryRouter>
    // );

    expect(screen.getByText(/Error occurred: Status 500/i)).toBeInTheDocument();
    expect(screen.getByText(/Internal Server Error/i)).toBeInTheDocument();
  });

  it('shows appropriate error for 400 status code', () => {
    const mockProps = {
      descriptions: [],
      error: true,
      status: 400,
      errorMessage: 'Bad Request',
      onCardClick: () => {},
    };
    const initialState = {
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
    };

    const store = setupStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchResults {...mockProps} />
        </MemoryRouter>
      </Provider>
    );
    // renderWithProviders(
    //   <MemoryRouter>
    //     <SearchResults {...mockProps} />
    //   </MemoryRouter>
    // );

    expect(screen.getByText(/Error occurred: Status 400/i)).toBeInTheDocument();
    expect(screen.getByText(/Bad Request/i)).toBeInTheDocument();
  });

  it('displays no results message when there are no descriptions', () => {
    const mockProps = {
      descriptions: [],
      error: false,
      status: null,
      errorMessage: undefined,
      onCardClick: () => {},
    };
    const initialState = {
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
    };

    const store = setupStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchResults {...mockProps} />
        </MemoryRouter>
      </Provider>
    );
    // renderWithProviders(
    //   <MemoryRouter>
    //     <SearchResults {...mockProps} />
    //   </MemoryRouter>
    // );
    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });

  it('renders a list of Card components when descriptions are provided', () => {
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
      error: false,
      status: null,
      errorMessage: undefined,
      onCardClick: () => {},
    };

    const initialState = {
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
    };

    const store = setupStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchResults {...mockProps} />
        </MemoryRouter>
      </Provider>
    );

    // renderWithProviders(
    //   <MemoryRouter>
    //     <SearchResults {...mockProps} />
    //   </MemoryRouter>
    // );

    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();
  });
});
