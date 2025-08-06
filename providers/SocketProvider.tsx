'use client';

import React, {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';

import { setSocketParticipantsMiddleware } from '@/redux/middlewares';

const SocketContext = createContext<SocketContextType>({ socket: null });

export function SocketProvider({ children }: PropsWithChildren) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io({ path: '/api/socket' });

    socketInstance.on('connect', () => {
      console.log('✅ Connected to socket server');

      setSocketParticipantsMiddleware(socketInstance);
      setSocket(socketInstance);
    });

    socketInstance.on('message', (msg) => {
      console.log(msg);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}

export type SocketContextType = {
  socket: Socket | null;
};
