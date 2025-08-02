import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { Card } from './Card';
import { Provider } from 'react-redux';
import type { PersonSWType } from '../../types/interfaces';
import { setupStore } from '../../app/store';

describe('Card Component', () => {
  it('displays item names and descriptions correctly', () => {
    const mockData: PersonSWType = {
      id: 1,
      name: 'Luke Skywalker',
      hair_color: 'Blond',
      sex: 'Male',
      age: 19,
      occupation: 'Jedi',
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
        <Card {...mockData} />
      </Provider>
    );

    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Blond/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();
    expect(screen.getByText(/19/i)).toBeInTheDocument();
    expect(screen.getByText(/occupation: Jedi/i)).toBeInTheDocument();
  });

  it('handles missing or undefined data gracefully', () => {
    const mockData: PersonSWType = {
      id: null,
      name: null,
      hair_color: null,
      sex: null,
      age: null,
      occupation: null,
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
        <Card {...mockData} />
      </Provider>
    );

    expect(screen.getByText(/Unknown Name/i)).toBeInTheDocument();
    expect(screen.getByText(/No Hair Color/i)).toBeInTheDocument();
    expect(screen.getByText(/Unknown Sex/i)).toBeInTheDocument();
    expect(screen.getByText(/Age not specified/i)).toBeInTheDocument();
    expect(screen.getByText(/occupation: No Occupation/i)).toBeInTheDocument();
  });
});
