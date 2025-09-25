import { useEffect, useState } from 'react';
import { SearchResults } from './components/SearchResults/SearchResults';
import { type PersonSWType } from './types/interfaces';
import { Loader } from './components/Loader/Loader';
import { SearchForm } from './components/SearchForm/SearchForm';
import { PaginationControls } from './components/PaginationControls/PaginationControls';
import { useNavigate, Outlet, useParams } from 'react-router';
import styles from './components/App/App.module.css';
import { AppStyles } from './components/App/AppStyles';
import { FlyOut } from './components/FlyOut/FlyOut';
import { useSelector } from 'react-redux';
import { useLocalStorage } from './shared/useLocalStorage';
import { useGetPersonsQuery } from './services/api';
import { BaseButton } from './components/BaseButton/BaseButton';

export interface AppState {
  currentPage: number;
  status: null | number;
}

const ALL_PAGES = 20;

const App: React.FC = () => {
  const { page = '1' } = useParams();

  const [storedQuery, setStoredQuery] = useLocalStorage('searchItem');

  const [appState, setAppState] = useState<AppState>({
    currentPage: parseInt(page),
    status: null,
  });
  const { data, error, isLoading, isFetching, refetch } = useGetPersonsQuery({
    search: storedQuery,
    page: appState.currentPage,
  });

  const card = useSelector(
    (state: { card: { card: PersonSWType[] } }) => state.card.card
  );

  const { buttonClassname } = AppStyles();

  const [isOutletVisible, setOutletVisible] = useState(false);
  const showOutlet = () => setOutletVisible(true);
  const hideOutlet = () => setOutletVisible(false);
  const navigate = useNavigate();
  const fetchCharacters = (query: string) => {
    setStoredQuery(query);
  };

  useEffect(() => {
    navigate(`/page/${appState.currentPage}`);
  }, [storedQuery]);

  function handlePageChange(page: number) {
    setAppState({
      ...appState,
      currentPage: page,
    });
    navigate(`/page/${appState.currentPage}`);
  }
  function handleNextPage() {
    if (appState.currentPage <= ALL_PAGES) {
      setAppState({
        ...appState,
        currentPage: appState.currentPage + 1,
      });
    }
    navigate(`/page/${appState.currentPage}`);
  }
  function handlePreviousPage() {
    if (appState.currentPage >= 1) {
      setAppState({
        ...appState,
        currentPage: appState.currentPage - 1,
      });
    }
    navigate(`/page/${appState.currentPage}`);
  }

  return (
    <>
      {isLoading ? (
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
              initialQuery={storedQuery}
              onFormSubmit={fetchCharacters}
            />
            {isFetching ? (
              <Loader />
            ) : (
              <SearchResults
                descriptions={data?.data ?? []}
                error={error}
                status={appState.status}
                onCardClick={showOutlet}
              />
            )}
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
          <BaseButton
            onClick={refetch}
            additionalClasses="w-50 absolute top-24 right-4"
          >
            Refetch cards
          </BaseButton>
        </>
      )}
    </>
  );
};

export default App;
