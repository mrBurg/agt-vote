import type { Metadata } from 'next';

import './globals.scss';

import type { LayoutProps } from './types';
import type { NavSlice } from '@/redux/slices/navSlices';
import type { ParticipantsState } from '@/redux/slices/participantsSlices';
import type { FooterSlice } from '@/redux/slices/footerSlices';
import type { Participant } from '@/redux/slices/types';

import StoreProvider from '@/providers/StoreProvider';
import SocketProvider from '@/providers/SocketProvider';
import { fetcher, participantsFetcher } from '@/utils/request';

export const metadata: Metadata = {
  title: "America's Got Talent",
  description: 'Audience Voting',
};

export default async function Layout({ children }: LayoutProps) {
  const { nav, footer } = await fetcher<NavSlice & FooterSlice>('/api');
  const { results } = await participantsFetcher(9);

  const participantsProcessed = results.reduce(
    (accumulator: ParticipantsState, item: Participant) => {
      const { picture, name, email, login, location } = item;

      accumulator.push({
        picture,
        name,
        login,
        location,
        votes: 0,
      });

      return accumulator;
    },
    []
  );

  return (
    <html lang="en">
      <body className="body">
        <SocketProvider>
          <StoreProvider
            initialState={{ nav, participants: participantsProcessed, footer }}
          >
            {children}
          </StoreProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
