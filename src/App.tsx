import { useEffect, useState } from 'react';
import { SearchResults } from './components/SearchResults/SearchResults';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { type PersonSWType } from './types/interfaces';
import { Loader } from './components/loader/Loader';
import { SearchForm } from './searchForm/SearchForm';
import { PaginationControls } from './components/PaginationControls/PaginationControls';
import { useNavigate } from 'react-router';
import fetchData from './shared/useFetchData';

export interface AppState {
  searchTerm: string;
  data: PersonSWType[];
  currentPage: number;
  loading: boolean;
  error: boolean;
  status: null | number;
  errorMessage?: string;
}

const ALL_PAGES = 20;

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    searchTerm: localStorage.getItem('searchItem') || '',
    data: [],
    currentPage: 1,
    loading: true,
    error: false,
    status: null,
    errorMessage: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(appState.currentPage, setAppState, appState);
    navigate(`?page=${appState.currentPage}`);
  }, [appState.currentPage]);

  function updateSearchInputValue(newResult: string) {
    const trimmedResult = newResult.trim();
    setAppState((prevState) => ({
      ...prevState,
      searchTerm: trimmedResult,
      currentPage: 1,
    }));
  }
  function handleSearch() {
    fetchData(appState.currentPage, setAppState, appState);
    setAppState((prev) => ({
      ...prev,
      currentPage: 1,
    }));
    navigate(`?page=1`);
  }

  function handlePageChange(page: number) {
    setAppState({
      ...appState,
      currentPage: page,
    });
  }
  function handleNextPage() {
    if (appState.currentPage <= ALL_PAGES) {
      setAppState({
        ...appState,
        currentPage: appState.currentPage + 1,
      });
    }
  }
  function handlePreviousPage() {
    if (appState.currentPage >= 1) {
      setAppState({
        ...appState,
        currentPage: appState.currentPage - 1,
      });
    }
  }

  return (
    <ErrorBoundary>
      {appState.loading ? (
        <Loader />
      ) : (
        <>
          <SearchForm
            updateSearch={updateSearchInputValue}
            onClick={handleSearch}
            onFormSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          />
          <SearchResults
            descriptions={appState.data}
            error={appState.error}
            status={appState.status}
            errorMessage={appState.errorMessage}
          />
          <PaginationControls
            totalPages={ALL_PAGES}
            handlePageChange={handlePageChange}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            currentPage={appState.currentPage}
          />
        </>
      )}
    </ErrorBoundary>
  );
};

export default App;
