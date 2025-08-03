import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, afterEach } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';
import { Component } from 'react';
import '@testing-library/jest-dom';

class ErrorButton extends Component {
  state = { hasError: false };

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Button error!');
    }

    return <button onClick={this.handleClick}>Throw Error</button>;
  }
}

describe('Error Boundary', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should catch and handles JavaScript errors in child components', () => {
    const ProblemChild = () => {
      throw new Error('I crashed!');
    };

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    const errorText = screen.getByText(/Something went wrong./i);

    expect(errorText).toBeInTheDocument();
  });

  it('should log error to console', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const ProblemChild = () => {
      throw new Error('I crashed!');
    };

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy.mock.calls[0][1].message).toEqual(
      expect.stringMatching(/I crashed!/i)
    );

    consoleErrorSpy.mockRestore();
  });

  it('should display fallback UI when error occurs', () => {
    const ProblemChild = () => {
      throw new Error('I crashed!');
    };

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong./i)).toBeInTheDocument();
  });

  it('should show fallback UI on button click that throws error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const TestComponent = () => (
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    render(<TestComponent />);
    fireEvent.click(screen.getByText(/Throw Error/i));
    await waitFor(() => {
      expect(screen.getByText(/Something went wrong./i)).toBeInTheDocument();
    });
  });
});
