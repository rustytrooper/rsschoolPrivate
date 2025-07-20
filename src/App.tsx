import { Component, type ReactNode } from 'react';
import { SearchResults } from './components/SearchResults/SearchResults';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { type PersonSWType } from './types/interfaces';
import { ErrorButton } from './errorButton/ErrorButton';
import { Loader } from './components/loader/Loader';
import { SearchForm } from './searchForm/SearchForm';
import { personService } from './shared/personService';

interface AppState {
  searchTerm: string;
  data: PersonSWType[];
  loading: boolean;
  error: boolean;
  status: null | number;
  errorMessage?: string;
}

class App extends Component<Record<string, unknown>, AppState> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      searchTerm: '',
      data: [],
      loading: true,
      error: false,
      status: null,
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const service = new personService();
    const { searchTerm } = this.state;
    const { dataFetched, errorMessage } = await service.fetchData(searchTerm);

    if (errorMessage) {
      this.setState({
        error: true,
        loading: false,
        status: errorMessage.includes('400') ? 400 : 500,
        errorMessage,
      });
    } else {
      this.setState({
        data: dataFetched || [],
        loading: false,
      });
    }
  };

  updateSearchInputValue = (newResult: string) => {
    const trimmedResult = newResult.trim();
    this.setState({ searchTerm: trimmedResult });
  };

  render(): ReactNode {
    const { loading } = this.state;
    return (
      <ErrorBoundary>
        {loading ? (
          <Loader />
        ) : (
          <>
            <SearchForm
              updateSearch={this.updateSearchInputValue}
              onClick={this.fetchData}
              onFormSubmit={this.fetchData}
            />
            <SearchResults
              descriptions={this.state.data}
              error={this.state.error}
              status={this.state.status}
              errorMessage={this.state.errorMessage}
            />
            <ErrorButton />
          </>
        )}
      </ErrorBoundary>
    );
  }
}

export default App;
