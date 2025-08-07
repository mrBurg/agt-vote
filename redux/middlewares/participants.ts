import { Middleware } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { Socket } from 'socket.io-client';

import type { FooterState, NavState, ParticipantsState } from '../slices';

let socket: Socket | null = null;

export function setSocketParticipantsMiddleware(socketInstance: Socket) {
  socket = socketInstance;
}

export const participantsSocketMiddleware: Middleware<
  {},
  MiddlewareStoreProps
> = (store) => (next) => (action) => {
  const prevParticipants = store.getState().participants;
  const result = next(action);
  const nextParticipants = store.getState().participants;

  if (
    socket &&
    socket.connected &&
    !isEqual(prevParticipants, nextParticipants)
  ) {
    socket.emit('setParticipants', nextParticipants);
    // socket.emit('vote');
  }

  return result;
};

/* export const config = {
  matcher: ['/', '/taring'],
}; */

export type MiddlewareStoreProps = {
  participants: ParticipantsState;
  nav: NavState;
  footer: FooterState;
};
