import './App.css';
import { Component, type ReactNode } from 'react';
import { SearchButton } from './components/searchButton';
import { SearchInput } from './components/searchInput';
import { SearchResults } from './components/searchResults';
import { type PersonSWType } from './types/interfaces';

interface AppState {
  searchTerm: string;
  data: PersonSWType[];
  loading: boolean;
  error: boolean;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
      data: [],
      loading: true,
      error: false,
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        `https://swapi.py4e.com/api/people/?search=${this.state.searchTerm}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data.results);
      this.setState({ data: data.results, loading: false });
    } catch (error: any) {
      this.setState({ error: error.message, loading: false });
    }
  };

  updateSearchInputValue = (newResult: string) => {
    this.setState({ searchTerm: newResult });
  };

  render(): ReactNode {
    const { searchTerm, data } = this.state;

    const filteredData = searchTerm
      ? data.filter((el: PersonSWType) =>
          el.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : data;
    return (
      <>
        <SearchInput updateSearch={this.updateSearchInputValue} />
        <SearchButton />
        <SearchResults data={filteredData} />
      </>
    );
  }
}

export default App;
