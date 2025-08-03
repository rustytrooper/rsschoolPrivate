import { type PersonSWType } from '../types/interfaces';
import { BASE_URL } from './constants';

class personService {
  fetchData = async (
    page: number,
    searchTerm?: string
  ): Promise<{
    dataFetched: PersonSWType[] | null;
    errorMessage: string | null;
  }> => {
    try {
      const query = searchTerm ? `search=${searchTerm}&` : '';
      const response = await fetch(`${BASE_URL}?${query}page=${page}`);
      const data = await response.json();
      const dataFetched: PersonSWType[] = data.data;
      return { dataFetched, errorMessage: null };
    } catch (error) {
      console.error(error);
      return { dataFetched: null, errorMessage: 'Error while fetching data' };
    }
  };

  fetchCharacterData = async (
    id: number
  ): Promise<{
    dataFetched: PersonSWType | null;
    errorMessage: string | null;
  }> => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      const dataFetched: PersonSWType = data.data;
      return { dataFetched, errorMessage: null };
    } catch (error) {
      console.error(error);
      return { dataFetched: null, errorMessage: 'Error while fetching data' };
    }
  };
}

export const PersonService = new personService();
