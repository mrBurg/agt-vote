'use client';

import { isEmpty } from 'lodash';
import { useEffect, useRef } from 'react';

import { useAppDispatch } from '@/redux/hooks';
import { setClient, setParticipants } from '@/redux/slices';
import { useSocket } from '@/providers';

export function DataProvider() {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (socket && socket.connected && !isInitialized.current) {
      isInitialized.current = true;

      const getDataType = 'getData';
      const getClientType = 'getClient';
      const getParticipantsType = 'getParticipants';
      const setParticipantsType = 'setParticipants';

      socket.emit(getDataType, localStorage.getItem('clientId'));

      socket.on(getClientType, (client) => {
        localStorage.setItem('clientId', client.id);

        dispatch(setClient(client));
      });

      socket.on(getParticipantsType, (participants) => {
        if (!isEmpty(participants)) {
          dispatch(setParticipants(participants));
        }
      });

      socket.on(setParticipantsType, (data) => {
        dispatch(setParticipants(data));
      });

      return () => {
        socket.off(getDataType);
        socket.off(getClientType);
        socket.off(getParticipantsType);
        socket.off(setParticipantsType);
      };
    }
  }, [socket]);

  return null;
}
