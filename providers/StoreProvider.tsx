'use client';

import { type PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';

import type { FooterProps, NavProps, ParticipantsProps } from '@/redux/slices';

import { AppStore, createStore } from '@/redux/store';
import { DataProvider } from './DataProvider';

export function StoreProvider({ children, initialState }: InitialStateProps) {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = createStore(initialState);
  }

  return (
    <Provider store={storeRef.current}>
      <DataProvider />
      {children}
    </Provider>
  );
}

export type InitialStateProps = PropsWithChildren<{
  initialState?: NavProps & ParticipantsProps & FooterProps;
}>;
