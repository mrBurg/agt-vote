import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import './globals.scss';

import type { LayoutProps, MetaProps, ParticipantsResultsProps } from '@/types';
import type { ParticipantsState } from '@/redux/slices';
import type { ParticipantProps } from '@/components/participant';

import { fetcher, fetchFileAsBase64 } from '@/utils';
import { SocketProvider, StoreProvider } from '@/providers';

export async function generateMetadata(): Promise<Metadata> {
  return await fetcher<MetaProps>('/api/meta');
}

export default async function Layout({ children }: PropsWithChildren) {
  const { lang, nav, footer, numParticipants } = await fetcher<LayoutProps>(
    '/api'
  );

  let { results } = await fetcher<ParticipantsResultsProps>(
    `/?seed=constant-user&results=${numParticipants || 10}`,
    process.env.NEXT_PUBLIC_PARTICIPANT_API
  );

  if (results) {
    results = await results.reduce<Promise<ParticipantsState>>(
      async (
        accPromise: Promise<ParticipantsState>,
        item: ParticipantProps
      ) => {
        const { picture, name, login, location } = item;
        const accumulator = await accPromise;

        const base64 = await fetchFileAsBase64(picture.large);

        accumulator.push({
          picture: { ...picture, base64 },
          name,
          login,
          location,
          votes: 0,
        });

        return accumulator;
      },
      Promise.resolve([])
    );
  }

  return (
    <html lang={lang || 'en'}>
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
