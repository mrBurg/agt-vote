import { PropsWithChildren, ReactNode } from 'react';

import type { ParticipantsSlice } from '@/redux/slices/participantsSlices';
import type { NavSlice } from '@/redux/slices/navSlices';
import type { FooterSlice } from '@/redux/slices/footerSlices';

export type LayoutProps = Readonly<{
  children: ReactNode;
}>;

export type InitialStateProps = PropsWithChildren<{
  initialState?: ParticipantsSlice & NavSlice & FooterSlice;
}>;

/* export type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}; */
