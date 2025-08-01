import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '../features/CardSlice';
import type { PersonSWType } from '../types/interfaces';

// interface RootState {
//   card: {
//     card: PersonSWType[];
//   };
// }

const store = configureStore({
  reducer: {
    card: cardReducer,
  },
});

// export function setupStore(preloadedState?: Partial<RootState>) {
//   return configureStore({
//     reducer: cardReducer,
//     preloadedState,
//   });
// }
export function setupStore(preloadedState?: { card: PersonSWType[] }) {
  return configureStore({
    reducer: cardReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof cardReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default store;
