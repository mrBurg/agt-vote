'use client';

import { type PropsWithChildren, useMemo } from 'react';
import { Provider } from 'react-redux';

import type { FooterProps, NavProps, ParticipantsProps } from '@/redux/slices';

import { createStore } from '@/redux/store';
import { ParticipantsProvider } from './ParticipantsProvider';

export function StoreProvider({ children, initialState }: InitialStateProps) {
  const store = useMemo(() => createStore(initialState), [initialState]);

  return (
    <Provider store={store}>
      <ParticipantsProvider />
      {children}
    </Provider>
  );
}

export type InitialStateProps = PropsWithChildren<{
  initialState?: NavProps & ParticipantsProps & FooterProps;
}>;
