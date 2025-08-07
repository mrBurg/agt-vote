import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';
import type { Socket as NetSocket } from 'net';

import type { ParticipantProps } from '@/components/participant';

let participants: ParticipantProps[] = [];
// const users: Record<string, UserVoteData> = {};

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
      const userId = socket.id;

      console.log(`🔌 New client connected. ID: ${userId}`);

      /* if (!users[userId]) {
        users[userId] = {
          id: userId,
          votesRemaining: Math.ceil(Math.random() * 10),
        };
      } */

      /* socket.on('vote', (participantId) => {
        let { votesRemaining } = users[userId];

        if (votesRemaining > 0) {
          votesRemaining--;

          // Обнови голос участника
          // updateVote(participantId);

          // Верни статус клиенту
          socket.emit('voteSuccess', { remaining: votesRemaining });
        } else {
          socket.emit('voteDenied', 'No votes left');
        }
      }); */

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

/* type UserVoteData = {
  id: string;
  votesRemaining: number;
}; */
