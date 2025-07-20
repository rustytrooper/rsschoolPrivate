import { type PersonSWType } from '../types/interfaces';

export class personService {
  fetchData = async (
    url: string
  ): Promise<{
    dataFetched: PersonSWType[] | null;
    errorMessage: string | null;
  }> => {
    try {
      let errorMessage: Error | string;
      const localStorageSearch = localStorage.getItem('searchItem');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await fetch(
        `https://spapi.dev/api/characters?search=${localStorageSearch || url}`
      );
      if (!response.ok) {
        switch (response.status) {
          case 400:
            errorMessage = 'Bad Request: Please check your input.';
            break;
          case 500:
            errorMessage = 'Internal Server Error: Please try again later.';
            break;
          default:
            errorMessage = 'An unknown error occurred.';
        }
        return { dataFetched: null, errorMessage };
      }
      const data = await response.json();
      const dataFetched: PersonSWType[] = data.data;
      return { dataFetched, errorMessage: null };
    } catch (error) {
      console.error(error);
      return { dataFetched: null, errorMessage: 'Error while fetching data' };
    }
  };
}
