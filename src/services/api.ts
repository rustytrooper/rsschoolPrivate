import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../shared/constants';
import { type PersonSWType } from '../types/interfaces';

type GetPersonsQuery = {
  search: string;
  page: number;
};
type ReturnQueryType = {
  data: PersonSWType[];
};

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Persons'],
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builder) => ({
    getPersons: builder.query<ReturnQueryType, GetPersonsQuery>({
      query: ({ search, page }) => `?search=${search}&page=${page}`,
    }),
  }),
});

export const { useGetPersonsQuery } = api;
