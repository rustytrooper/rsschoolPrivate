import { Component, type ReactNode } from 'react';

interface SearchInputProps {
  updateSearch: (newResult: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
export class SearchInput extends Component<SearchInputProps> {
  state = {
    searchInput: '',
  };

  componentDidMount(): void {
    const savedSearchInpit = localStorage.getItem('searchItem');
    if (savedSearchInpit) {
      this.setState({ searchInput: savedSearchInpit });
    }
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchInput = e.target.value;
    this.setState({ searchInput: newSearchInput });
    this.props.updateSearch(newSearchInput);
    localStorage.setItem('searchItem', newSearchInput);
  };
  render(): ReactNode {
    return (
      <div>
        <input
          type="text"
          value={this.state.searchInput}
          onChange={this.handleInputChange}
          onKeyDown={this.props.onKeyDown}
          placeholder="Your search here"
          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
      </div>
    );
  }
}
