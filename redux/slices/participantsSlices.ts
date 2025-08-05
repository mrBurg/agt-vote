import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { find } from 'lodash';

import type { Participant } from './types';

import { RootState } from '../store';

const initialState: Participant[] = [];

const participantsSlices = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    setParticipants: (_state, action: PayloadAction<any>) => action.payload,
    updateVote(state, action: PayloadAction<string>) {
      const participant = find(
        state,
        (item) => item.login.salt === action.payload
      );

      if (participant) {
        participant.votes += 1;
      }
    },
  },
});

export const { name } = participantsSlices;
export const { updateVote, setParticipants } = participantsSlices.actions;

export const selectParticipants = (state: RootState) => state.participants;

export default participantsSlices.reducer;

export type ParticipantsState = typeof initialState;
export type ParticipantsSlice = { participants: ParticipantsState };
