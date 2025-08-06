import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type PersonSWType } from '../types/interfaces';
import { BASE_URL } from '../shared/constants';
import { type RootState } from '../app/store';

export const fetchPersonByName = createAsyncThunk<PersonSWType, string>(
  'persone/fetchByQuery',
  async (query, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}?${query}`);
    const data = await response.json();
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    return data;
  }
);

type RequestState = 'pending' | 'fulfilled' | 'rejected';

export const personSlice = createSlice({
  name: 'person',
  initialState: {
    dataByQuery: {} as Record<string, PersonSWType | undefined>,
    statusByQuery: {} as Record<string, RequestState | undefined>,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPersonByName.pending, (state, action) => {
      state.statusByQuery[action.meta.arg] = 'pending';
    });
    builder.addCase(fetchPersonByName.fulfilled, (state, action) => {
      state.statusByQuery[action.meta.arg] = 'fulfilled';
      state.dataByQuery[action.meta.arg] = action.payload;
    });
    builder.addCase(fetchPersonByName.rejected, (state, action) => {
      state.statusByQuery[action.meta.arg] = 'rejected';
    });
  },
});

export const selectStatusByQuery = (state: RootState, query: string) =>
  state.person.statusByQuery[query];
export const selectDataByQuery = (state: RootState, query: string) =>
  state.person.dataByQuery[query];
