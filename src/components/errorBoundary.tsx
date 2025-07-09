import { Component, type ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }> {
  state = { hasError: false, error: Error };
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
    this.setState({ hasError: true, error });
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Something went wrong.</h1>
        </>
      );
    }
    return this.props.children;
  }
}
