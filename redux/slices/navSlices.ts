import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

const initialState: NavLinkProps[] = [];

const navSlices = createSlice({
  name: 'nav',
  initialState,
  reducers: {},
});

export const selectNav = (state: RootState) => state.nav;

export const { name: navName } = navSlices;
export const navReducer = navSlices.reducer;

export type NavState = typeof initialState;
export type NavProps = { nav: NavState };

export type NavLinkProps = {
  href: string;
  title: string;
};
