import { Middleware } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { Socket } from 'socket.io-client';

import type { Nav, Participant } from '@/redux/slices/types';

let socket: Socket | null = null;

export function setSocketParticipantsMiddleware(socketInstance: Socket) {
  socket = socketInstance;
}

export const participantsSocketMiddleware: Middleware<
  {},
  {
    participants: Participant[];
    nav: Nav[];
    footer: string;
  }
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
  }

  return result;
};
