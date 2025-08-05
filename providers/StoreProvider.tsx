'use client';

import { useMemo } from 'react';
import { Provider } from 'react-redux';

import { InitialStateProps } from '@/app/types';

import { createStore } from '@/redux/store';
import { ParticipantsProvider } from './ParticipantsProvider';

export default function StoreProvider({
  children,
  initialState,
}: InitialStateProps) {
  const store = useMemo(() => createStore(initialState), [initialState]);

  return (
    <Provider store={store}>
      <ParticipantsProvider />
      {children}
    </Provider>
  );
}
