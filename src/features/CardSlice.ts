import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { type PersonSWType } from '../types/interfaces';
import { BASE_URL } from '../shared/constants';
import { type RootState } from '../app/store';

export const fetchPersonsByName = createAsyncThunk<PersonSWType[], string>(
  'persons/fetchByQuery',
  async (query, { rejectWithValue }) => {
    // const response = await fetch(`${BASE_URL}?${query}`);
    const url = query !== '' ? `${BASE_URL}?${query}` : BASE_URL;

    const response = await fetch(url);
    const data = await response.json();
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    return data.data;
  }
);

type RequestState = 'pending' | 'fulfilled' | 'rejected';

export const personsSlice = createSlice({
  name: 'persons',
  initialState: {
    dataByQuery: {} as Record<string, PersonSWType[]>,
    statusByQuery: {} as Record<string, RequestState>,
    cards: [] as PersonSWType[],
  },
  reducers: {
    addCard: (state, action: PayloadAction<PersonSWType>) => {
      state.cards.push(action.payload);
    },
    removeCard: (state, action: PayloadAction<PersonSWType>) => {
      const index = state.cards.findIndex(
        (card) => card.id === action.payload.id
      );
      if (index !== -1) {
        state.cards.splice(index, 1);
      }
    },
    removeAllCards: (state) => {
      state.cards = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPersonsByName.pending, (state, action) => {
      state.statusByQuery[action.meta.arg] = 'pending';
    });
    builder.addCase(fetchPersonsByName.fulfilled, (state, action) => {
      state.statusByQuery[action.meta.arg] = 'fulfilled';
      state.dataByQuery[action.meta.arg] = action.payload;
    });
    builder.addCase(fetchPersonsByName.rejected, (state, action) => {
      state.statusByQuery[action.meta.arg] = 'rejected';
    });
  },
});

export const selectStatusByQuery = (state: RootState, query: string) =>
  state.persons.statusByQuery[query];
export const selectDataByQuery = (state: RootState, query: string) =>
  state.persons.dataByQuery[query];

export const selectCards = (state: RootState) => state.persons.cards;

export const { addCard, removeCard, removeAllCards } = personsSlice.actions;

// import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import { type PersonSWType } from '../types/interfaces';

// const initialState: { card: PersonSWType[] } = {
//   card: [],
// };

// const cardSlice = createSlice({
//   name: 'card',
//   initialState,
//   reducers: {
//     addCard: (state, action: PayloadAction<PersonSWType>) => {
//       state.card.push(action.payload);
//     },
//     removeCard: (state, action: PayloadAction<PersonSWType>) => {
//       const index = state.card.findIndex(
//         (card) => card.id === action.payload.id
//       );
//       if (index !== -1) {
//         state.card.splice(index, 1);
//       }
//     },
//     removeAllCards: (state) => {
//       state.card = [];
//     },
//   },
// });

// export const { addCard, removeCard, removeAllCards } = cardSlice.actions;
// export default cardSlice.reducer;
