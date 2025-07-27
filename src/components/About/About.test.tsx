import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { About } from './About';
import '@testing-library/jest-dom';

describe('About', () => {
  it('renders the correct content', () => {
    render(<About />);

    const heading = screen.getByText(
      /What about me\? Do you really wanna hurt me, baby\?/i
    );
    expect(heading).toBeInTheDocument();

    const additionalText = screen.getByText(
      /Do you wanna break my heart to pieces\?/i
    );
    expect(additionalText).toBeInTheDocument();
  });
});
