import './App.css';
import { Component, type ReactNode } from 'react';
import { SearchResults } from './components/searchResults';
import { ErrorBoundary } from './components/errorBoundary';
import { type PersonSWType } from './types/interfaces';
import { SearchControls } from './components/searchControls';
import { ErrorButton } from './components/errorButton';
import { Loader } from './components/loader';

interface AppState {
  searchTerm: string;
  data: PersonSWType[];
  loading: boolean;
  error: boolean;
}

class App extends Component<Record<string, unknown>, AppState> {
  constructor(props: Record<string, unknown>) {
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
      const localStorageSearch = localStorage.getItem('searchItem');
      const response = await fetch(
        `https://spapi.dev/api/characters?search=${
          localStorageSearch || this.state.searchTerm
        }`
      );
      const data = await response.json();
      this.setState({
        data: data.data,
        loading: false,
      });
    } catch (error: unknown) {
      this.setState({ error: true, loading: false });
      console.error(error);
    }
  };

  updateSearchInputValue = (newResult: string) => {
    const trimmedResult = newResult.trim();
    this.setState({ searchTerm: trimmedResult });
  };

  render(): ReactNode {
    const { loading } = this.state;

    if (loading) {
      return <Loader />;
    }
    return (
      <ErrorBoundary>
        <SearchControls
          updateSearch={this.updateSearchInputValue}
          onClick={this.fetchData}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              this.fetchData();
            }
          }}
        />
        <SearchResults descriptions={this.state.data} />
        <ErrorButton />
      </ErrorBoundary>
    );
  }
}

export default App;
