import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { find } from 'lodash';

import type { ParticipantProps } from '@/components/participant';
import type { RootState } from '../store';

const initialState: ParticipantProps[] = [];

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

export const selectParticipants = (state: RootState) => state.participants;

export const { name: participantsName } = participantsSlices;
export const { updateVote, setParticipants } = participantsSlices.actions;

export const participantsReducer = participantsSlices.reducer;

export type ParticipantsState = typeof initialState;
export type ParticipantsProps = { participants: ParticipantsState };
