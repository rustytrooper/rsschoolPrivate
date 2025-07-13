import { Component, type ReactNode } from 'react';
import { SearchButton } from './searchButton';
import { SearchInput } from './searchInput';

interface SearchControlsProps {
  updateSearch: (newResult: string) => void;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export class SearchControls extends Component<SearchControlsProps> {
  render(): ReactNode {
    return (
      <div className="flex justify-between mb-2">
        <SearchInput
          updateSearch={this.props.updateSearch}
          onKeyDown={this.props.onKeyDown}
        />
        <SearchButton onClick={this.props.onClick} />
      </div>
    );
  }
}
