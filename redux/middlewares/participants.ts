import { Middleware } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { Socket } from 'socket.io-client';

import type {
  ClientState,
  FooterState,
  NavState,
  ParticipantsState,
} from '../slices';

let socket: Socket | null = null;

export function setSocketParticipantsMiddleware(socketInstance: Socket) {
  socket = socketInstance;
}

export const participantsSocketMiddleware: Middleware<
  {},
  MiddlewareStoreProps
> = (store) => (next) => (action) => {
  const { participants: prevParticipants } = store.getState();
  const result = next(action);
  const { participants: nextParticipants, client: NextClient } =
    store.getState();

  if (socket && socket.connected) {
    if (!isEqual(prevParticipants, nextParticipants)) {
      socket.emit('setParticipants', nextParticipants);
    }

    socket.emit('setVotes', NextClient);
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
  client: ClientState;
};
