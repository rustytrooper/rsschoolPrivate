import { render, screen } from '@testing-library/react';
import { ErrorButton } from './ErrorButton';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';

test('should render ErrrorButton component', () => {
  render(<ErrorButton />);
  const button = screen.getByRole('button', { name: /Check error boundary/i });
  expect(button).toBeInTheDocument();
});
