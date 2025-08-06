import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { personSlice } from '../features/CardSlice';

const rootReducer = combineReducers({
  person: personSlice.reducer,
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
