import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import { Card } from './Card';

describe('Card Component', () => {
  test('displays item names and descriptions correctly', () => {
    const mockData = {
      id: 1,
      name: 'Luke Skywalker',
      hair_color: 'Blond',
      sex: 'Male',
      age: 19,
      occupation: 'Jedi',
    };

    render(<Card {...mockData} />);

    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Blond/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();
    expect(screen.getByText(/19/i)).toBeInTheDocument();
    expect(screen.getByText(/occupation: Jedi/i)).toBeInTheDocument();
  });

  test('handles missing or undefined data gracefully', () => {
    const mockData = {
      id: null,
      name: null,
      hair_color: null,
      sex: null,
      age: null,
      occupation: null,
    };

    render(<Card {...mockData} />);

    expect(screen.getByText(/Unknown Name/i)).toBeInTheDocument();
    expect(screen.getByText(/No Hair Color/i)).toBeInTheDocument();
    expect(screen.getByText(/Unknown Sex/i)).toBeInTheDocument();
    expect(screen.getByText(/Age not specified/i)).toBeInTheDocument();
    expect(screen.getByText(/occupation: No Occupation/i)).toBeInTheDocument();
  });
});
