import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

const initialState: string = `&copy; ${new Date().getFullYear()}`;

const footerSlices = createSlice({
  name: 'footer',
  initialState,
  reducers: {},
});

export const selectFooter = (state: RootState) => state.footer;

export const { name: footerName } = footerSlices;
export const footerReducer = footerSlices.reducer;

export type FooterState = typeof initialState;
export type FooterProps = { footer: FooterState };
