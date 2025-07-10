import { Component } from 'react';

interface ErrorButtonState {
  showError: boolean;
}

export class ErrorButton extends Component<{}, ErrorButtonState> {
  constructor(props: ErrorButtonState) {
    super(props);
    this.state = {
      showError: false,
    };
  }

  handleButtonClick = () => {
    this.setState({ showError: true });
  };

  render() {
    if (this.state.showError) {
      throw new Error('This is a test error!');
    }
    return (
      <button
        className="bg-cyan-500 text-white font-semibold py-2 px-4 rounded hover:bg-cyan-600 cursor-pointer transition-colors"
        onClick={() => this.handleButtonClick()}
      >
        Check error boundary
      </button>
    );
  }
}
