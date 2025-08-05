import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

const initialState = '';

const footerSlices = createSlice({
  name: 'footer',
  initialState,
  reducers: {},
});

export const { name } = footerSlices;
export const selectFooter = (state: RootState) => state.footer;

export default footerSlices.reducer;

export type FooterState = typeof initialState;
export type FooterSlice = { footer: FooterState };
