import { render, screen } from '@testing-library/react';
import { ErrorButton } from './ErrorButton';
import React from 'react';
import '@testing-library/jest-dom';

test('renders ErrrorButton component', () => {
  render(<ErrorButton />);
  const linkElement = screen.getByText(/Check error boundary/i);
  expect(linkElement).toBeInTheDocument();
});
