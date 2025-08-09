import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';
import type { Socket as NetSocket } from 'net';

import type { ParticipantProps } from '@/components/participant';

let participants: ParticipantProps[] = [];
const users: Record<string, UserVoteData> = {};

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
      console.log(`🔌 New client connected. ID: ${socket.id}`);

      const messageType = 'message';

      socket.on(messageType, (data) => {
        /* socket.emit(
          messageType,
          `From socket to page to current client. ID: ${data}`
        ); */
        /* socket.broadcast.emit(
          messageType,
          `From socket to page to all except current client. ID: ${data}`
        ); */
        io.emit(messageType, `From socket to page to all clients. ID: ${data}`);
      });

      socket.on('getData', (clientId) => {
        let userId = clientId;

        if (clientId && users[clientId]) {
          userId = clientId;

          console.log(`♻️ Connected as an existing user. ID: ${clientId}`);
        } else {
          userId = socket.id;

          users[userId] = {
            id: userId,
            votesRemaining: 5,
          };

          console.log(`✨ Connected as a new user. ID: ${userId}`);
        }

        socket.emit('getClient', users[userId]);
        io.emit('getParticipants', participants);
      });

      const setParticipantsType = 'setParticipants';

      socket.on(setParticipantsType, (data) => {
        participants = data;

        io.emit(setParticipantsType, data);
      });

      socket.on('setVotes', ({ id, votesRemaining }) => {
        users[id] = { ...users[id], votesRemaining };
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

type UserVoteData = {
  id: string;
  votesRemaining: number;
};
