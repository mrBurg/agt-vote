import { createSlice } from '@reduxjs/toolkit';

import type { Nav } from './types';

import { RootState } from '../store';

const initialState: Nav[] = [];

const navSlices = createSlice({
  name: 'nav',
  initialState,
  reducers: {},
});

export const { name } = navSlices;
export const selectNav = (state: RootState) => state.nav;

export default navSlices.reducer;

export type NavState = typeof initialState;
export type NavSlice = { nav: NavState };
