import { Component } from 'react';
import { BaseButton } from '../components/BaseButton/BaseButton';

interface ErrorButtonState {
  isErrorShown: boolean;
}

export class ErrorButton extends Component<
  Record<string, unknown>,
  ErrorButtonState
> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      isErrorShown: false,
    };
  }

  handleButtonClick = () => {
    this.setState({ isErrorShown: true });
  };

  render() {
    if (this.state.isErrorShown) {
      throw new Error('This is a test error!');
    }
    return (
      <BaseButton onClick={this.handleButtonClick} additionalClasses="my-3">
        Check error boundary
      </BaseButton>
    );
  }
}
