import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { personsSlice } from '../features/CardSlice';
const personsSlice = await import('../features/CardSlice').then(
  (module) => module.personsSlice
);

const rootReducer = combineReducers({
  persons: personsSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default store;
