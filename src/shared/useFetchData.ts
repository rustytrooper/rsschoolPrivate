import { personService } from './personService';
import type { AppState } from '../App';
import type { Dispatch, SetStateAction } from 'react';

async function fetchData(
  page: number,
  setAppState: Dispatch<SetStateAction<AppState>>,
  appState: AppState
) {
  const service = new personService();
  const { dataFetched, errorMessage } = await service.fetchData(
    page,
    appState.searchTerm
  );
  if (errorMessage) {
    setAppState({
      ...appState,
      error: true,
      loading: false,
      status: errorMessage.includes('400') ? 400 : 500,
      errorMessage,
    });
  } else {
    setAppState({
      ...appState,
      data: dataFetched || [],
      loading: false,
    });
  }
}

export default fetchData;
