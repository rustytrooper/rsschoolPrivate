import './App.css';
import { Component, type ReactNode } from 'react';
import { SearchResults } from './components/searchResults';
import { ErrorBoundary } from './components/errorBoundary';
import { type PersonSWType } from './types/interfaces';
import { SearchControls } from './components/searchControls';

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
    const searchQuery = localStorage.getItem('searchQuery');
    if (searchQuery) {
      this.setState({ searchTerm: searchQuery });
    }
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        `https://spapi.dev/api/characters?search=${this.state.searchTerm}`
      );
      const data = await response.json();
      this.setState({
        data: data.data,
        loading: false,
      });
    } catch (error: any) {
      this.setState({ error: error.message, loading: false });
    }
  };

  updateSearchInputValue = (newResult: string) => {
    this.setState({ searchTerm: newResult });
  };

  render(): ReactNode {
    const { loading, data } = this.state;
    console.log(data);

    if (loading) {
      return <div>LOADING</div>;
    }
    return (
      <ErrorBoundary>
        <SearchControls
          updateSearch={this.updateSearchInputValue}
          onClick={this.fetchData}
        />
        <SearchResults descriptions={this.state.data} />
      </ErrorBoundary>
    );
  }
}

export default App;
