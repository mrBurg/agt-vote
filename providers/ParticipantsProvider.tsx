'use client';

import { isEmpty } from 'lodash';
import { useEffect, useRef } from 'react';

import { useAppDispatch } from '@/redux/hooks';
import { setParticipants } from '@/redux/slices';
import { useSocket } from '@/providers';

export function ParticipantsProvider() {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (socket && socket.connected && !isInitialized.current) {
      isInitialized.current = true;

      socket.emit('getParticipants');
      socket.on('getParticipants', (data) => {
        if (!isEmpty(data)) {
          dispatch(setParticipants(data));
        }
      });

      socket.on('setParticipants', (data) => {
        dispatch(setParticipants(data));
      });

      /* socket.on('voteSuccess', ({ remaining }) => {
        console.log(`Осталось голосов: ${remaining}`);
      }); */

      /* socket.on('voteDenied', (message) => {
        alert(message);
      });
 */
      return () => {
        socket.off('getParticipants');
        socket.off('setParticipants');
        // socket.off('voteSuccess');
        // socket.off('voteDenied');
      };
    }
  }, [socket]);

  return null;
}
