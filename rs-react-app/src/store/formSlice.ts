import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import { type PersonSWType } from '../types/interfaces'
import { type FormFields } from '../shared/types';

const initialState: { form: FormFields } = {
  form: {
    name: '',
    age: 18,
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    terms: false,
    file: undefined,
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    changeFields: (state, action: PayloadAction<FormFields>) => {
      state.form = action.payload;
    },
  },
});

export const { changeFields } = formSlice.actions;
export default formSlice.reducer;
