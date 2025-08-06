import { useCallback, useEffect, useState } from 'react';
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
// import { PersonService } from './shared/personService';
import { useLocalStorage } from './shared/useLocalStorage';
// import { normalizeError } from './shared/utils';
import { useGetPersonsByQuery } from './features/hooks';

export interface AppState {
  // data: PersonSWType[];
  currentPage: number;
  // loading: boolean;
  // error: Error | null;
  status: null | number;
}

const ALL_PAGES = 20;

const App: React.FC = () => {
  const { page = '1' } = useParams();

  const [storedQuery, setStoredQuery] = useLocalStorage('searchItem');

  const [appState, setAppState] = useState<AppState>({
    // data: [],
    currentPage: parseInt(page),
    // loading: true,
    status: null,
    // error: null,
  });

  const { data, isLoading, isError } = useGetPersonsByQuery(storedQuery);

  // const card = useSelector(
  //   (state: { card: { card: PersonSWType[] } }) => state.card.card
  // );
  const card = useSelector(
    (state: { persons: { persons: PersonSWType[] } }) => state.persons.persons
  );
  const { buttonClassname } = AppStyles();

  const [isOutletVisible, setOutletVisible] = useState(false);
  const showOutlet = () => setOutletVisible(true);
  const hideOutlet = () => setOutletVisible(false);
  const navigate = useNavigate();

  const fetchCharacters = useCallback(
    (query: string) => {
      setAppState((prev) => ({ ...prev, loading: true, error: null }));

      // if (isSuccess) {
      //   setAppState((prev) => ({
      //     ...prev,
      //     data: data ?? [],
      //     loading: false,
      //     error: null,
      //   }));
      // }
      if (isError) {
        setAppState((prev) => ({
          ...prev,
          loading: false,
          error: new Error('Error while fetching data'),
          data: [],
        }));
      }
      setAppState((prev) => ({
        ...prev,
        data: data ?? [],
        loading: false,
        error: null,
      }));

      // PersonService.fetchData(appState.currentPage, query).then(
      //   (response) => {
      //     setAppState((prev) => ({
      //       ...prev,
      //       data: response.dataFetched ?? [],
      //       loading: false,
      //       error: null,
      //     }));
      //   },
      //   (err: unknown) => {
      //     setAppState((prev) => ({
      //       ...prev,
      //       loading: false,
      //       error: normalizeError(err),
      //       data: [],
      //     }));
      //   }
      // );

      setStoredQuery(query);
    },
    [appState.currentPage, setStoredQuery]
  );

  useEffect(() => {
    fetchCharacters(storedQuery);
    navigate(`/page/${appState.currentPage}`);
  }, [fetchCharacters, storedQuery]);

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

            <SearchResults
              descriptions={data}
              error={isError}
              status={appState.status}
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
    </>
  );
};

export default App;
