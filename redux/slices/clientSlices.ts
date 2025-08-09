import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { ParticipantProps } from '@/components/participant';
import type { RootState } from '../store';

const initialState: ClientData = { id: '', votesRemaining: 0 };

const clientSlices = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClient: (_state, action: PayloadAction<ClientData>) => action.payload,
    updateVotesRemaining(state) {
      if (state.votesRemaining > 0) {
        state.votesRemaining--;
      }
    },
  },
});

export const selectVotes = (state: RootState) => state.client.votesRemaining;

export const { name: clientName } = clientSlices;
export const { setClient, updateVotesRemaining } = clientSlices.actions;

export const clientReducer = clientSlices.reducer;

export type ClientState = typeof initialState;
export type ClientProps = { votes: ClientState };

type ClientData = {
  id: string;
  votesRemaining: number;
};
