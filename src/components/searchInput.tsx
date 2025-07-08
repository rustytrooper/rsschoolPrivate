import { Component, type ReactNode } from 'react';

interface SearchInputProps {
  updateSearch: (newResult: string) => void;
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
          placeholder="Your search here"
        />
      </div>
    );
  }
}
