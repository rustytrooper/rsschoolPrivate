import { Component, type ReactNode } from 'react';

interface SearchButtonProps {
  onClick: () => void;
}

export class SearchButton extends Component<SearchButtonProps> {
  render(): ReactNode {
    return (
      <button
        className="bg-cyan-500 text-white font-semibold py-2 px-4 rounded hover:bg-cyan-600 cursor-pointer transition-colors"
        onClick={() => this.props.onClick()}
      >
        Search
      </button>
    );
  }
}
