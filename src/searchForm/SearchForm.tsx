import { Component, type ReactNode } from 'react';
import { BaseButton } from '../components/BaseButton';

interface SearchFormProps {
  updateSearch: (newResult: string) => void;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClick: VoidFunction;
}
export class SearchForm extends Component<SearchFormProps> {
  state = {
    searchInput: '',
  };

  componentDidMount(): void {
    const savedSearchInput = localStorage.getItem('searchItem');
    if (savedSearchInput) {
      this.setState({ searchInput: savedSearchInput });
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
      <form
        onSubmit={this.props.onFormSubmit}
        className="flex justify-between my-3"
        role="form"
      >
        <input
          autoFocus
          type="text"
          value={this.state.searchInput}
          onChange={this.handleInputChange}
          placeholder="Your search here"
          className="w-80 flex px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
        <BaseButton onClick={this.props.onClick}>Search</BaseButton>
      </form>
    );
  }
}
