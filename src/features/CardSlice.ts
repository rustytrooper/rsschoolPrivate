import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type PersonSWType } from '../types/interfaces';

const initialState: { card: PersonSWType[] } = {
  card: [],
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<PersonSWType>) => {
      state.card.push(action.payload);
    },
    removeCard: (state, action: PayloadAction<PersonSWType>) => {
      const index = state.card.findIndex(
        (card) => card.id === action.payload.id
      );
      if (index !== -1) {
        state.card.splice(index, 1);
      }
    },
    removeAllCards: (state) => {
      state.card = [];
    },
  },
});

export const { addCard, removeCard, removeAllCards } = cardSlice.actions;
export default cardSlice.reducer;
