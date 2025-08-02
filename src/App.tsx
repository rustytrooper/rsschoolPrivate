import { useEffect, useState } from 'react';
import { SearchResults } from './components/SearchResults/SearchResults';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { type PersonSWType } from './types/interfaces';
import { Loader } from './components/loader/Loader';
import { SearchForm } from './components/searchForm/SearchForm';
import { PaginationControls } from './components/PaginationControls/PaginationControls';
import { useNavigate, Outlet, useParams } from 'react-router';
import fetchData from './shared/useFetchData';
import styles from './components/App/App.module.css';
import { AppStyles } from './components/App/AppStyles';
import { FlyOut } from './components/FlyOut/FlyOut';
import { useSelector } from 'react-redux';

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
  const { page = '1' } = useParams();
  const [appState, setAppState] = useState<AppState>({
    searchTerm: localStorage.getItem('searchItem') || '',
    data: [],
    currentPage: parseInt(page),
    loading: true,
    error: false,
    status: null,
    errorMessage: '',
  });
  const [isOutletVisible, setOutletVisible] = useState(false);
  const card = useSelector(
    (state: { card: { card: PersonSWType[] } }) => state.card.card
  );
  const { buttonClassname } = AppStyles();

  const showOutlet = () => setOutletVisible(true);
  const hideOutlet = () => setOutletVisible(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(appState.currentPage, setAppState, appState);
    navigate(`/page/${appState.currentPage}`);
  }, [appState.currentPage, navigate]);

  function updateSearchInputValue(newResult: string) {
    const trimmedResult = newResult.trim();
    setAppState((prevState) => ({
      ...prevState,
      searchTerm: trimmedResult,
      currentPage: 1,
    }));
  }
  function handleSearch() {
    fetchData(1, setAppState, appState);
    setAppState((prev) => ({
      ...prev,
      currentPage: 1,
    }));
    navigate(`/page/1`);
  }

  function handlePageChange(page: number) {
    setAppState({
      ...appState,
      currentPage: page,
    });
    navigate(`/page/${page}`);
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
          {isOutletVisible && (
            <div className={styles.overlay} onClick={hideOutlet}>
              <button
                onClick={() => {
                  navigate(
                    appState.currentPage ? `/page/${appState.currentPage}` : '/'
                  );
                }}
                className={buttonClassname}
              >
                {'X'}
              </button>
            </div>
          )}

          <div
            className={`${styles.content} ${isOutletVisible ? styles.blur : ''}`}
          >
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
              onCardClick={showOutlet}
            />
            <PaginationControls
              totalPages={ALL_PAGES}
              handlePageChange={handlePageChange}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              currentPage={appState.currentPage}
            />
          </div>

          {isOutletVisible && (
            <div className={styles.outlet}>
              <Outlet />
            </div>
          )}
          {card.length > 0 && <FlyOut numberOfSelected={card.length} />}
        </>
      )}
    </ErrorBoundary>
  );
};

export default App;
