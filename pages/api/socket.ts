import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';
import type { Socket as NetSocket } from 'net';

import type { ParticipantProps } from '@/components/participant';

let participants: ParticipantProps[] = [];

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponseWithSocketIO
) {
  if (!res.socket.server.io) {
    console.log('✅ Socket.IO server starting...');

    const io = new IOServer(res.socket.server, {
      path: '/api/socket',
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('🔌 New client connected');

      const message = 'message';

      socket.on(message, (data) => {
        // socket.emit(message, 'From socket to page');
        // socket.broadcast.emit(message, 'From socket to page');
        io.emit(message, `From socket to page ${data}`);
      });

      const setParticipants = 'setParticipants';

      socket.on(setParticipants, (data) => {
        participants = data;

        io.emit(setParticipants, data);
      });

      const getParticipants = 'getParticipants';

      socket.on(getParticipants, () => {
        io.emit(getParticipants, participants);
      });

      socket.on('disconnect', () => {
        console.log('❌ Client disconnected');
      });
    });

    res.socket.server.io = io;
  } else {
    console.log('♻️ Socket.IO server already running.');
  }

  res.end();
}

type NextApiResponseWithSocketIO = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
};
