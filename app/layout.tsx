import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import './globals.scss';

import type { LayoutProps, MetaProps, ParticipantsResultsProps } from '@/types';
import type { ParticipantsState } from '@/redux/slices';
import type { ParticipantProps } from '@/components/participant';

import { fetcher } from '@/utils';
import { SocketProvider, StoreProvider } from '@/providers';

export async function generateMetadata(): Promise<Metadata> {
  return await fetcher<MetaProps>('/api/meta');
}

export default async function Layout({ children }: PropsWithChildren) {
  const { lang, nav, footer, numParticipants } = await fetcher<LayoutProps>(
    '/api'
  );

  let { results } = await fetcher<ParticipantsResultsProps>(
    `/?seed=constant-user&results=${numParticipants}`,
    process.env.NEXT_PUBLIC_PARTICIPANT_API
  );

  if (results) {
    results = results.reduce(
      (accumulator: ParticipantsState, item: ParticipantProps) => {
        const { picture, name, login, location } = item;

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
  }

  return (
    <html lang={lang}>
      <body suppressHydrationWarning={true}>
        <SocketProvider>
          <StoreProvider initialState={{ nav, participants: results, footer }}>
            {children}
          </StoreProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
