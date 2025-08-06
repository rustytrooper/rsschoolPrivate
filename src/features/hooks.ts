import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../app/store';
import {
  selectStatusByQuery,
  selectDataByQuery,
  fetchPersonByName,
} from './CardSlice';
import type { Action, ThunkDispatch } from '@reduxjs/toolkit';

export function useGetPokemonByNameQuery(name: string) {
  const dispatch: ThunkDispatch<RootState, unknown, Action> = useDispatch();
  const status = useSelector((state: RootState) =>
    selectStatusByQuery(state, name)
  );
  const data = useSelector((state: RootState) =>
    selectDataByQuery(state, name)
  );
  useEffect(() => {
    if (status === undefined) {
      dispatch(fetchPersonByName(name));
    }
  }, [status, name, dispatch]);

  const isUninitialized = status === undefined;
  const isLoading = status === 'pending' || status === undefined;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';

  return { data, isUninitialized, isLoading, isError, isSuccess };
}
