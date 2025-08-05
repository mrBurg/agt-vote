import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';
import type { Socket as NetSocket } from 'net';

import { Participant } from '@/redux/slices/types';

type NextApiResponseWithSocketIO = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
};

let participants: Participant[] = [];

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

      socket.on('message', (data) => {
        // socket.emit('message', 'From socket to page');
        // socket.broadcast.emit('message', 'From socket to page');
        io.emit('message', `From socket to page ${data}`);
      });

      socket.on('setParticipants', (data) => {
        participants = data;

        io.emit('setParticipants', data);
      });

      socket.on('getParticipants', () => {
        io.emit('getParticipants', participants);
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
