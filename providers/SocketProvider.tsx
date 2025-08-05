'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import type { LayoutProps } from '@/app/types';

import { setSocketParticipantsMiddleware } from '@/redux/middlewares/participants';

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({ socket: null });

export default function SocketProvider({ children }: LayoutProps) {
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
