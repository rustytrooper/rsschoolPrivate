import { Component, type ReactNode } from 'react';

interface BaseButtonProps {
  onClick: VoidFunction;
  children: string;
  additionalClasses?: string;
}

export class BaseButton extends Component<BaseButtonProps> {
  render(): ReactNode {
    return (
      <button
        className={`bg-cyan-500 text-white font-semibold py-2 px-4 rounded hover:bg-cyan-600 cursor-pointer transition-colors ${this.props.additionalClasses}`}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
