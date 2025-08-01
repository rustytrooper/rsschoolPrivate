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
        (card) =>
          card.name === action.payload.name &&
          card.hair_color === action.payload.hair_color &&
          card.sex === action.payload.sex &&
          card.age === action.payload.age &&
          card.occupation === action.payload.occupation
      );
      if (index !== -1) {
        state.card.splice(index, 1);
      }
    },
  },
});

export const { addCard, removeCard } = cardSlice.actions;
export default cardSlice.reducer;
