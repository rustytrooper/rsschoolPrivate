import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../../App';
import '@testing-library/jest-dom';

describe('App Component', () => {
  it('renders loading indicator initially', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('loader')).toBeInTheDocument();
  });

  it('has appropriate ARIA labels for screen readers', () => {
    const { getByTestId } = render(<App />);
    const loader = getByTestId('loader');
    expect(loader).toHaveAttribute('aria-label', 'Loading...');
  });
});
