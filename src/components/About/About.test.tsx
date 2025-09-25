import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { About } from './About';
import '@testing-library/jest-dom';

describe('About', () => {
  it('should render the correct content', () => {
    render(<About />);

    const additionalText = screen.getByText(
      /Do you wanna break my heart to pieces\?/i
    );
    expect(additionalText).toBeInTheDocument();
  });
});
