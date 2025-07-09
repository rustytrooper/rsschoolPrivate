import './App.css';
import { Component, type ReactNode } from 'react';
import { SearchButton } from './components/searchButton';
import { SearchInput } from './components/searchInput';
import { SearchResults } from './components/searchResults';
import { ErrorBoundary } from './components/errorBoundary';
import { ErrorButton } from './components/errorButton';
import { type PersonSWType } from './types/interfaces';

interface AppState {
  searchTerm: string;
  data: PersonSWType[];
  descriptions: PersonSWType[];
  loading: boolean;
  error: boolean;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
      data: [],
      descriptions: [],
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
        `https://www.swapi.tech/api/people?page=3&limit=10?search=${this.state.searchTerm}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.setState(
        {
          data: data.results,
          loading: false,
        },
        this.fetchPeopleDescription
      );
    } catch (error: any) {
      this.setState({ error: error.message, loading: false });
    }
  };

  updateSearchInputValue = (newResult: string) => {
    this.setState({ searchTerm: newResult });
  };

  fetchPeopleDescription = async () => {
    try {
      const descriptions = await Promise.all(
        this.state.data.map(async (char) => {
          const results = await fetch(char.url);
          const data = await results.json();
          return data.result.properties;
        })
      );

      this.setState({ descriptions });
    } catch (error: any) {
      this.setState({ error: error.message, loading: false });
    }
  };

  render(): ReactNode {
    const { searchTerm, descriptions, loading } = this.state;
    console.log(descriptions);

    const filteredData = searchTerm
      ? descriptions.filter((el: PersonSWType) =>
          el.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : descriptions;
    if (loading) {
      return <div>LOADING</div>;
    }
    return (
      <ErrorBoundary>
        <>
          <SearchInput updateSearch={this.updateSearchInputValue} />
          <SearchButton />
          <SearchResults descriptions={filteredData} />
          <ErrorButton />
        </>
      </ErrorBoundary>
    );
  }
}

export default App;
