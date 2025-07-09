import { Component } from 'react';

export class ErrorButton extends Component {
  throwError = () => {
    throw new Error('Test error');
  };
  render() {
    return (
      <button onClick={() => this.throwError()}>Check error boundary</button>
    );
  }
}
